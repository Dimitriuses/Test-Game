import { Actor, ActorArgs, Color, Engine, EventEmitter, GameEvent, Sprite, Text, Vector } from 'excalibur';
import { Card } from '../classes/card';
import { CardActor } from './cardActor';
import { CharsResources } from '../assets/imades/players';
import { CardResources } from '../assets';
import { Player } from '../classes/player';
import { ActorEvents } from 'excalibur/build/dist/Actor';

export interface CardPlayerEvents {
  click: GameEvent<ActorEvents>;

}

export class CardPlayerActor extends Actor{

  //private _cardActor: CardActor;
  private _playerSprite: Sprite;
  //private _cardSprite: Sprite;
  //private _cards: Card[];

  private _player: Player;
  private uperText: Text;
  public set Card(value: Card | Card[] ) { this._player.dealACards(value); this.updateText(); }
  public get Card():Card | undefined { let output = this._player.Card; this.updateText(); return output; }
  public get isLos(): boolean {let output = this._player.lenght == 0; if(output)this.playerLos(); return output };
  private _isSelected: boolean
  public get isSelected():boolean { return this._isSelected; };
  public set isSelected(value) { this._isSelected = value; if(value){this.uperText.color = Color.Red } else { this.uperText.color = Color.Black }   };
  public events = new EventEmitter<ActorEvents & CardPlayerEvents>();
  
  constructor(config?: ActorArgs, playerSprite?: Sprite){
    super(config);
    //this.isLos = false;
    this._isSelected = false;

    this._player = new Player();
    this._player.Name = "Player " + this._player.id.split('-')[0];
    this.uperText = new Text({ text: this._player.Name + " " + this._player.lenght });

    //this._cards = [];
    this._playerSprite = playerSprite ?? CharsResources.Char1.toSprite();
    this._playerSprite.height = config?.height ?? this._playerSprite.height;
    this._playerSprite.width = config?.width ?? this._playerSprite.width;

    //this._cardSprite = CardResources.CardBack.toSprite();
    //let a = new Sprite()
    //this._cardSprite.height = 
    //this._cardActor = new CardActor({  })

    this.on("pointerdown", () => { this.onClick(); });



    
  }

  playerLos(){
    let losActor = new Actor({ z: 1});
    let losSprite = CharsResources.CharLos.toSprite();
    losSprite.height = this.height;
    losSprite.width = this.width;
    losActor.graphics.add(losSprite);
    this.addChild(losActor);
  }

  onInitialize(engine: Engine): void {
    let uperTextActor = new Actor({ pos: new Vector( 0, -75 )});
    uperTextActor.graphics.add(this.uperText);
    this.addChild(uperTextActor);
    
    this.graphics.add(this._playerSprite);
  }

  updateText() {
    this.uperText.text = this._player.Name + " " + this._player.lenght;
    //this.isLos = true;
  }

  isOwner(card: CardActor):boolean {
    if(card._owner != undefined){
      return card._owner == this._player.id;
    } else {
      return false
    }
  }

  setOwner(card:CardActor){
    card._owner = this._player.id;
  }

  onClick(){
    if(!this.isLos){
      this.events.emit("click", this);
    }
  }

  


}