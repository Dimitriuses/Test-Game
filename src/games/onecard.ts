import { Color, DefaultLoader, Scene, Timer, Vector } from 'excalibur';
import { CardComparisonOperator } from '../shared/classes/card';
import { CardResources, CharsResources, IMAGE_CARD_HEIGHT, IMAGE_CARD_WIDTH } from '../shared/assets';
import { delay } from '../shared/utilites';
import { CardActor } from '../shared/actors/cardActor';
import { Button } from '../shared/actors/buttonActor';
import { CardPlayerActor } from '../shared/actors/cardPlayerActor';
import { CardDeckActor } from '../shared/actors/cardDeckActor';

/**
 * A "high card wins" game for four players. Click the deck to deal, then let the Auto
 * timer play it out: each tick two neighbouring players turn one card each, the higher
 * card takes both, and a tie pushes the pair into a buffer that the next comparison wins.
 */
export class OneCardGameScene extends Scene{

  private _cardDeckActor: CardDeckActor;
  private cardActors: CardActor[];
  private bufCardActors: CardActor[];

  private isAuto: boolean;

  private Players: CardPlayerActor[];
  private get isAllowedTakeCard():boolean { return this.cardActors.length < 2;}

  private _autoButton: Button;
  private _autoTimer: Timer;

  constructor(){
    super();

    this.isAuto = false;

    this._cardDeckActor = new CardDeckActor(
      { height: IMAGE_CARD_HEIGHT/2, width: IMAGE_CARD_WIDTH/2, pos: new Vector(100, 500)});
    this._cardDeckActor.events.on('click', () => { this.dealCardsToAllPlayers(); });
    this.cardActors = [];
    this.bufCardActors = [];

    this.Players = [];

    this._autoButton = new Button(
      { width: 50, height: 50, pos: new Vector( 750, 100 ), color: Color.White }, 'Auto', Color.Red, true);
    this._autoButton.events.on('click', () => {
      if(this._cardDeckActor.lenght == 0)this.isAuto = this._autoButton.TogleStatus;
      if(this.isAuto){this._autoTimer.start();}else{ this._autoTimer.stop();}
    });

    this._autoTimer = new Timer({ fcn: () => { this.autoTakeCard(); }, repeats: true, interval: 1000  });
  }

  onPreLoad(loader: DefaultLoader): void {
    for (const res of Object.values(CardResources)) {
      loader.addResource(res);
    }

    for (const res of Object.values(CharsResources)) {
      loader.addResource(res);
    }
  }

  onInitialize(): void {
    const countOfPlayers = 4;
    this.engine.add(this._cardDeckActor);

    this.setupAllPlayerActors(countOfPlayers);

    this.engine.add(this._autoButton);
    this.engine.add(this._autoTimer);
  }

  setupAllPlayerActors(countOfPlayers: number){
    for(let i = 0; i < countOfPlayers; i++){
      const p = new CardPlayerActor(
        {width: 100, height: 100, pos: new Vector(100 + i*175, 100), z: 1}, CharsResources.Char1.toSprite());
      p.events.on('click', () => { p.playerLos(); });
      this.Players.push(p);
      this.engine.add(p);
    }
  }

  async dealCardsToAllPlayers(){
    const max = this._cardDeckActor.lenght / this.Players.length;
    for(let i = 0; i < max; i++){
      await delay(10);
      this.Players.forEach(p => { this._cardDeckActor.dealCard(p); });
    }
  }

  async takeCardFromPlayer(player: CardPlayerActor){
    let card = undefined;
    if(this.isAllowedTakeCard && !this.cardActors.some(ca=> player.isOwner(ca))){
      card = player.Card;
    }
    if(card != undefined) {
      const cardActor = new CardActor(
        {width: IMAGE_CARD_WIDTH/4, height: IMAGE_CARD_HEIGHT/4, pos: player.pos }, card, true);
      player.setOwner(cardActor);
      this.cardActors.push(cardActor);
      this.engine.add(cardActor);

      cardActor.actions.moveBy(new Vector(0,100), 100).toPromise();

      if(this.cardActors.length == 2){
        this.cardActors.forEach(c => { c.show(); });
        await delay(1000);
        this.cardActors.forEach(c => { c.hiden(); });

        await this.equalTwoCards(this.cardActors[0], this.cardActors[1]);
        this.cardActors = [];
      }
    }
  }

  async equalTwoCards(cardA: CardActor, cardB: CardActor){
    const ownerA = this.Players.filter(p => p.isOwner(cardA))[0];
    const ownerB = this.Players.filter(p => p.isOwner(cardB))[0];

    const equal = cardA.Card.isCard(CardComparisonOperator.Equal, cardB.Card, false);
    const isH = cardA.Card.isCard(CardComparisonOperator.HigerThen, cardB.Card, false);

    if(!equal){
      if(isH){
        ownerA.Card = [...this.cardActors.map(c => c.Card), ...this.bufCardActors.map(c => c.Card)];
        await this.animateWinCard(cardA, cardB);
      } else {
        ownerB.Card = [...this.cardActors.map(c => c.Card), ...this.bufCardActors.map(c => c.Card)];
        await this.animateWinCard(cardB, cardA);
      }
    } else {
      console.log(equal);
      console.log(this.cardActors);
      console.log(cardA.Card.toString() + ' === ' + cardB.Card.toString());
      this.bufCardActors.push(...this.cardActors);
      this.cardActors = [];
      await this.takeCardFromPlayer(ownerA);
      await this.takeCardFromPlayer(ownerB);
      this.bufCardActors = [];
    }

    // Reading `isLos` is not a no-op: the getter draws the elimination cross as a side
    // effect when the player has run out of cards. See "Known limitations" in the README.
    ownerA.isLos;
    ownerB.isLos;
  }

  async animateWinCard(winCard: CardActor, losCard: CardActor){
    const winer = this.Players.filter(p => p.isOwner(winCard))[0];
    this.bufCardActors.forEach(c => c.actions.moveTo(winCard.pos, 200));
    await losCard.actions.moveTo(winCard.pos, 200).toPromise();
    this.bufCardActors.forEach(c => c.actions.moveTo(winer.pos, 100).callMethod( () => { c.kill(); }));
    this.cardActors.filter(c => c === winCard || c === losCard).forEach( async (c) => {
      await c.actions.moveTo(winer.pos, 100).callMethod( () => { c.kill(); }).toPromise();
    });
  }

  async autoTakeCard(){
    const currentIndex = this.Players.indexOf(this.Players.filter(p => p.isSelected)[0] || undefined);
    if(currentIndex != -1){
      const nextPlayerIndex = (currentIndex >= this.Players.length - 1)? 0: currentIndex + 1;

      await this.takeCardFromPlayer(this.Players[currentIndex]);
      await this.takeCardFromPlayer(this.Players[nextPlayerIndex]);

      this.Players[currentIndex].isSelected = false;
      this.Players[nextPlayerIndex].isSelected = true;
    } else {
      this.Players[0].isSelected = true;
    }
  }
}
