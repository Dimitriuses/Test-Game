import { ActionSequence, Actor, ActorArgs, EventEmitter, GameEvent, ParallelActions, Vector } from 'excalibur';
import { CardDeck, CardDeckType } from '../classes/card';
import { ActorEvents } from 'excalibur/build/dist/Actor';
import { CardResources } from '../assets';
import { CardPlayerActor } from './cardPlayerActor';

export interface CardDeckEvents {
  click: GameEvent<ActorEvents>;
}

export class CardDeckActor extends Actor{

  private _cardDeck: CardDeck;
  public get lenght():number {return this._cardDeck.lenght; }
  public events = new EventEmitter<ActorEvents & CardDeckEvents>();

  constructor(config?: ActorArgs, cardDeck?: CardDeck){
    super(config);

    this._cardDeck = cardDeck ?? new CardDeck({deckType: CardDeckType.Deck48});
    this.on('pointerdown', () => { this.onClick(); });
  }

  onInitialize(): void {
    const sprite = CardResources.CardBack.toSprite();
    sprite.height = this.height;
    sprite.width = this.width;
    this.graphics.add(sprite);
    this._cardDeck.shuffle();
  }

  onClick(){
    this._cardDeck.shuffle();

    this.events.emit('click');
  }

  dealCard(player: CardPlayerActor){
    const card = this._cardDeck.getFirstCard();
    if(card != undefined){
      player.Card = card;
    }
    if(this._cardDeck.lenght == 0){
      this.graphics.hide();
    }
    this.animateDealCard(player.pos);
  }

  animateDealCard(endPosition: Vector){
    const sprite = CardResources.CardBack.toSprite();
    sprite.height = this.height;
    sprite.width = this.width;
    const actor = new Actor({z:0});
    actor.graphics.add(sprite);
    this.addChild(actor);

    const a = new ActionSequence(actor, as => {
      as.scaleTo(new Vector(0.5, 0.5), new Vector(1,1));
    });

    const b = new ActionSequence(actor, as => {
      as.moveTo(endPosition.sub(this.pos), 500);
    });

    const paralel = new ParallelActions([a,b]);
    actor.actions.runAction(paralel);
  }
}
