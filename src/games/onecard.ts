import { Actor, Color, DefaultLoader, Engine, Resource, Scene, SceneActivationContext, Timer, vec, Vector } from 'excalibur';
import { Card, CardComparisonOperator, CardDeck, CardDeckType } from '../shared/classes/card';
import { CardResources, CharsResources, IMAGE_CARD_HEIGHT, IMAGE_CARD_WIDTH } from '../shared/assets';
import { cardToResource, delay } from '../shared/utilites';
import { CardActor } from '../shared/actors/cardActor';
import { Button } from '../shared/actors/buttonActor';
import { CardPlayerActor } from '../shared/actors/cardPlayerActor';
import { CardDeckActor } from '../shared/actors/cardDeckActor';


export class OneCardGameScene extends Scene{

  //private _cardsDeck: CardDeck;
  private _cardDeckActor: CardDeckActor;
  private cardActors: CardActor[];
  private bufCardActors: CardActor[];

  private isAuto: boolean;

  private Players: CardPlayerActor[];
  private get isAllowedTakeCard():boolean { return this.cardActors.length < 2};
  //private isAlowedToClickOnPlayer: boolean;
  //private cardsInTable:  Card[];

  private _sortButton: Button;
  private _shuffleButton: Button;

  private _autoButton: Button;

  private _autoTimer: Timer;

  constructor(){
    super();

    this.isAuto = false;

    //this._cardsDeck = new CardDeck();
    this._cardDeckActor = new CardDeckActor({ height: IMAGE_CARD_HEIGHT/2, width: IMAGE_CARD_WIDTH/2, pos: new Vector(100, 500)});
    this._cardDeckActor.events.on("click", () => { this.dealCardsToAllPlayers() });
    this.cardActors = [];
    this.bufCardActors = [];

    this.Players = []; 
    //this.isAlowedToClickOnPlayer = true;
    //this.cardsInTable = [];

    this._sortButton = new Button({ width: 250, height: 50, pos: new Vector( 550, 450 ), color: Color.White }, "Sort", Color.Red);
    this._sortButton.events.on('click', () => {this.deckSort(); })

    this._shuffleButton = new Button({ width: 250, height: 50, pos: new Vector( 550, 510 ), color: Color.White }, "Shuffle", Color.Red);
    this._shuffleButton.events.on("click", () => {this.deckShuffle(); })

    this._autoButton = new Button({ width: 50, height: 50, pos: new Vector( 750, 100 ), color: Color.White }, "Auto", Color.Red, true);
    this._autoButton.events.on("click", () => { //console.log(this._cardDeckActor.lenght);

      if(this._cardDeckActor.lenght == 0)this.isAuto = this._autoButton.TogleStatus;
      if(this.isAuto){this._autoTimer.start()}else{ this._autoTimer.stop();}
    });

    //this.on("postupdate", async () => { await this.updateWithEv(); });
    this._autoTimer = new Timer({ fcn: () => { this.autoTakeCard(); }, repeats: true, interval: 1000  })
    
  }

  onPreLoad(loader: DefaultLoader): void {

    for (const res of Object.values(CardResources)) {
      loader.addResource(res);
    }

    for (const res of Object.values(CharsResources)) {
      loader.addResource(res);
    }
    
  }

  onInitialize(engine: Engine): void {
    let countOfPlayers = 4;
    //this._cardsDeck = new CardDeck({deckType: CardDeckType.Deck36});
    this.engine.add(this._cardDeckActor);
    //this.showAllCards();

    //engine.add(this._sortButton);
    //engine.add(this._shuffleButton);

    //this.setupDefaultCardIntable(countOfPlayers);
    this.setupAllPlayerActors(countOfPlayers);

    this.engine.add(this._autoButton);
    this.engine.add(this._autoTimer);
  }

  onActivate(context: SceneActivationContext<unknown>): void {

    //console.log("One Card Game is Active");
    //console.log(this._cardsDeck);

    //this._cardsDeck.returnToLogAllCards();

    //cardToResource(this._cardsDeck.Cards[0]);
    //console.log(cardToResource(this._cardsDeck.Cards[0]));

    //let y = 0;

    //this._cardsDeck.shuffle();


    //this.showAllCards();
  }


  setupAllPlayerActors(countOfPlayers: number){
    //const countOfPlayers = 4;

    for(let i = 0; i < countOfPlayers; i++){
      let p = new CardPlayerActor({width: 100, height: 100, pos: new Vector(100 + i*175, 100), z: 1}, CharsResources.Char1.toSprite())
      p.events.on("click", (e) => { /*if(this.isAuto)this.takeCardFromPlayer(p);*/ p.playerLos(); });
      this.Players.push(p);
      this.engine.add(p);
    }
  }

  // setupDefaultCardIntable(countOfCards: number){
  //   for(let i = 0; i < countOfCards; i++){
  //     let c = new CardActor({width: IMAGE_CARD_WIDTH/4, height: IMAGE_CARD_HEIGHT/4, pos: new Vector(100 + i*175, 100)}, CardResources.CardBack.toSprite());
  //     c.hiden();
  //     this.cardActors.push(c);
  //     this.engine.add(c);
  //   }

  // }

  async dealCardsToAllPlayers(){
    let max = this._cardDeckActor.lenght / this.Players.length;
    //console.log(max);
    for(let i = 0; i < max; i++){
      await delay(10);
      this.Players.forEach(p => { this._cardDeckActor.dealCard(p); });
    }

  }

  showAllCards(){
    //console.log(this.cardActors);
    // this._cardsDeck.Cards.forEach( (card, x) => {
    //   //console.log(cardToResource(card));
    //   //let cardSprite = cardToResource(card).toSprite();
    //   let cA = new CardActor({height: 95, width: 70, pos: new Vector(50 + (x%9) *70, 50 + Math.floor(x/9)*95)}, card);
    //   this.cardActors.push(cA);
    //   this.engine.add(cA);
    // })
  }

  async takeCardFromPlayer(player: CardPlayerActor){
    let card = undefined;
    if(this.isAllowedTakeCard && !this.cardActors.some(ca=> player.isOwner(ca))){
      card = player.Card
    }
    if(card != undefined) {
      //this.cardsInTable.push(card);
      //let sprite = cardToResource(card).toSprite();
      let cardActor = new CardActor({width: IMAGE_CARD_WIDTH/4, height: IMAGE_CARD_HEIGHT/4, pos: player.pos }, card, true);
      player.setOwner(cardActor);
      // sprite.height = cardActor.height;
      // sprite.width = cardActor.width;
      this.cardActors.push(cardActor);
      this.engine.add(cardActor);

      cardActor.actions.moveBy(new Vector(0,100), 100).toPromise();
      // console.log(card.graphics.current.);
      // console.log(CardResources.CardBack.toSprite())
      if(this.cardActors.length == 2){

        this.cardActors.forEach(c => { c.show(); });
        await delay(1000)
        this.cardActors.forEach(c => { c.hiden(); });
        
        await this.equalTwoCards(this.cardActors[0], this.cardActors[1]);
        this.cardActors = [];
      }

    }
  }

  async equalTwoCards(cardA: CardActor, cardB: CardActor){

    //console.log(cardA.Card.toString() + " === " + cardB.Card.toString());
    let ownerA = this.Players.filter(p => p.isOwner(cardA))[0];
    let ownerB = this.Players.filter(p => p.isOwner(cardB))[0];

    let equal = cardA.Card.isCard(CardComparisonOperator.Equal, cardB.Card, false);
    let isH = cardA.Card.isCard(CardComparisonOperator.HigerThen, cardB.Card, false);

    if(!equal){
      if(isH){
        ownerA.Card = [...this.cardActors.map(c => c.Card), ...this.bufCardActors.map(c => c.Card)];
        //conI = "==>";
        await this.animateWinCard(cardA, cardB);
      } else {
        ownerB.Card = [...this.cardActors.map(c => c.Card), ...this.bufCardActors.map(c => c.Card)];
        //conI = "<==";
        await this.animateWinCard(cardB, cardA);
      }
    } else { 
      console.log(equal);
      console.log(this.cardActors);
      console.log(cardA.Card.toString() + " === " + cardB.Card.toString());
      this.bufCardActors.push(...this.cardActors);
      this.cardActors = [];
      await this.takeCardFromPlayer(ownerA);
      await this.takeCardFromPlayer(ownerB);
      this.bufCardActors = [];
      
    }
    //this.cardActors = [];
    ownerA.isLos
    ownerB.isLos
    
  }

  async animateWinCard(winCard: CardActor, losCard: CardActor){
    let winer = this.Players.filter(p => p.isOwner(winCard))[0];
    this.bufCardActors.forEach(c => c.actions.moveTo(winCard.pos, 200))
    await losCard.actions.moveTo(winCard.pos, 200).toPromise();
    //this.cardActors.filter(c => !winer.isOwner(c)).forEach( async (c) => { await c.actions.moveTo(winCard.pos, 200).toPromise(); });
    this.bufCardActors.forEach(c => c.actions.moveTo(winer.pos, 100).callMethod( () => { c.kill(); }));
    this.cardActors.filter(c => c === winCard || c === losCard).forEach( async (c) => { await c.actions.moveTo(winer.pos, 100).callMethod( () => { c.kill(); }).toPromise(); });
  }



  async autoTakeCard(){
    //console.log("auto");
    let currentIndex = this.Players.indexOf(this.Players.filter(p => p.isSelected)[0] || undefined);
    if(currentIndex != -1){
      //console.log(currentIndex);
      let nextPlayerIndex = (currentIndex >= this.Players.length - 1)? 0: currentIndex + 1;
      
      await this.takeCardFromPlayer(this.Players[currentIndex]);
      await this.takeCardFromPlayer(this.Players[nextPlayerIndex]);


      this.Players[currentIndex].isSelected = false;
      this.Players[nextPlayerIndex].isSelected = true;
    } else {
      this.Players[0].isSelected = true;
    }
    

  }

  deckSort(){
    this.clearAll();
    //his._cardsDeck.sort();
    this.showAllCards();
  }

  deckShuffle(){
    this.clearAll();
    //this._cardsDeck.shuffle();
    this.showAllCards();
  }

  clearAll(){
    this.cardActors.forEach(c => c.kill());
    this.cardActors = [];
  }

  onDeactivate(context: SceneActivationContext): void {
    
  }

}