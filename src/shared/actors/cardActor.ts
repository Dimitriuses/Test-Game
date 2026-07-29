import { Actor, ActorArgs, Sprite } from 'excalibur';
import { CardResources } from '../assets';
import { Card } from '../classes/card';
import { cardToResource } from '../utilites';

export class CardActor extends Actor {
  public _owner: string | undefined;

  private card:Card;
  public get Card():Card { return this.card; }
  private cardSprite: Sprite;
  private backCardSprite: Sprite;

  private _isHiden: boolean;
  public get isHiden():boolean {return this._isHiden;}

  constructor(config: ActorArgs, card: Card, hiden = false){
    super(config);

    this.card = card;

    this.cardSprite = cardToResource(card).toSprite();
    this.cardSprite.height = config?.height ?? this.cardSprite.height;
    this.cardSprite.width = config?.width ?? this.cardSprite.width;

    this.backCardSprite = CardResources.CardBack.toSprite();
    this.backCardSprite.height = config?.height ?? this.backCardSprite.height;
    this.backCardSprite.width = config?.width ?? this.backCardSprite.width;

    this._isHiden = hiden;

    // Registering a pointer handler is what makes Excalibur hit-test this actor, which
    // keeps a click on a card from reaching the player underneath it. The handler itself
    // is empty — flipping a card by clicking it was never finished.
    this.on('pointerdown', () => { /* intentionally empty */ });
  }

  onInitialize(): void {
    if (!this.isHiden) {
      this.show();
    } else {
      this.hiden();
    }
  }

  hiden(){
    this.graphics.add(this.backCardSprite);
    this._isHiden = true;
  }

  show(){
    this.graphics.add(this.cardSprite);
    this._isHiden = false;
  }
}
