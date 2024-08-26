import { ActionSequence, Actor, ActorArgs, Engine, EventEmitter, GameEvent, ParallelActions, Vector } from 'excalibur';
import { CardDeck, CardDeckType } from '../classes/card';
import { ActorEvents } from 'excalibur/build/dist/Actor';
import { CardResources, IMAGE_CARD_HEIGHT, IMAGE_CARD_WIDTH } from '../assets';
import { Player } from '../classes/player';
import { CardPlayerActor } from './cardPlayerActor';

export interface CardDeckEvents {
  click: GameEvent<ActorEvents>;
}

export class CardDeckActor extends Actor{

  private _cardDeck: CardDeck;
  public get lenght():number {return this._cardDeck.lenght; }
  public events = new EventEmitter<ActorEvents & CardDeckEvents>();
  constructor(config?: ActorArgs, cardDeck?: CardDeck){
    super(config)

    this._cardDeck = cardDeck ?? new CardDeck({deckType: CardDeckType.Deck48});
    this.on("pointerdown", () => { this.onClick(); })
    

  }

  onInitialize(engine: Engine): void {
    let sprite = CardResources.CardBack.toSprite();
    sprite.height = this.height;
    sprite.width = this.width;
    this.graphics.add(sprite);
    this._cardDeck.shuffle();
  }

  onClick(){
    this._cardDeck.shuffle();

    this.events.emit("click");
  }

  dealCard(player: CardPlayerActor){
    let card = this._cardDeck.getFirstCard();
    if(card != undefined){
      player.Card = card;
    }
    if(this._cardDeck.lenght == 0){
      this.graphics.hide();
    }
    this.animateDealCard(player.pos);
  }

  animateDealCard(endPosition: Vector){
    let sprite = CardResources.CardBack.toSprite();
    sprite.height = this.height;
    sprite.width = this.width;
    let actor = new Actor({z:0});
    actor.graphics.add(sprite);
    this.addChild(actor);

    let a = new ActionSequence(actor, as => {
      as.scaleTo(new Vector(0.5, 0.5), new Vector(1,1));
    });

    let b = new ActionSequence(actor, as => {
      as.moveTo(endPosition.sub(this.pos), 500);
    });

    let paralel = new ParallelActions([a,b]);
    actor.actions.runAction(paralel);

    // actor.actions.scaleTo(new Vector(0.20, 0.20), new Vector(1,1));
    // actor.actions.moveTo(endPosition.sub(this.pos), 500).callMethod(() => { actor.z = -1});
  }




}