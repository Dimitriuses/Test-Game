import { Actor, ActorArgs, Engine, Graphic, ImageSource, Resource, Sprite } from 'excalibur';
import { CardResources } from '../assets';
import { Player } from '../classes/player';
import { Card } from '../classes/card';
import { cardToResource } from '../utilites';

export class CardActor extends Actor {
  public _owner: string | undefined; //Player | undefined;
  // public get Owner() { return this._owner }
  // public get isOwner():boolean { return this._owner != undefined }
  // public changeOwner()

  private card:Card;
  public get Card():Card { return this.card }
  private cardSprite: Sprite;
  private backCardSprite: Sprite;

  private _isHiden: boolean;
  public get isHiden():boolean {return this._isHiden;}

  constructor(config: ActorArgs, card: Card, hiden: boolean = false){
    super(config);

    this.card = card;

    this.cardSprite = cardToResource(card).toSprite();
    this.cardSprite.height = config?.height ?? this.cardSprite.height;
    this.cardSprite.width = config?.width ?? this.cardSprite.width;
    
    this.backCardSprite = CardResources.CardBack.toSprite();
    this.backCardSprite.height = config?.height ?? this.backCardSprite.height;
    this.backCardSprite.width = config?.width ?? this.backCardSprite.width;
    //console.log(this.graphics);
    this._isHiden = hiden;

    //this.on("pointerup", () => { this.onClick(); });
    this.on("pointerdown", () => { this.onClick(); })
    

  }

  onInitialize(engine: Engine): void {

    //this.graphics.add("face", this.cardSprite);
    //this.graphics.add(this.backCardSprite);
    // this.graphics.add(this.cardSprite);
    // this._isHiden = false;
    //this.hiden();

    if (!this.isHiden) {
      this.show();
    } else {
      this.hiden();
    }
  }

  onClick(){
    // if(!this.isHiden) {
    //   this.show();
    // } else {
    //   this.hiden();
    // }
  }

  hiden(){
    //this.graphics.remove("face");
    //this.graphics.add("hiden", this.backCardSprite);
    //this.cardSprite.opacity = 1;
    this.graphics.add(this.backCardSprite);
    this._isHiden = true;
  }

  show(){
    //this.graphics.remove("hiden");
    //this.graphics.add("face", this.cardSprite);
    //this.cardSprite.opacity = 0;
    this.graphics.add(this.cardSprite);
    this._isHiden = false;
  }
}