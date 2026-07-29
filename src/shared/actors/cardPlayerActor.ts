import { Actor, ActorArgs, Color, EventEmitter, GameEvent, Sprite, Text, Vector } from 'excalibur';
import { Card } from '../classes/card';
import { CardActor } from './cardActor';
import { CharsResources } from '../assets/imades/players';
import { Player } from '../classes/player';
import { ActorEvents } from 'excalibur/build/dist/Actor';

export interface CardPlayerEvents {
  click: GameEvent<ActorEvents>;
}

export class CardPlayerActor extends Actor{

  private _playerSprite: Sprite;

  private _player: Player;
  private uperText: Text;
  public set Card(value: Card | Card[] ) { this._player.dealACards(value); this.updateText(); }
  public get Card():Card | undefined { const output = this._player.Card; this.updateText(); return output; }
  /** Reading this draws the elimination cross as a side effect when the hand is empty. */
  public get isLos(): boolean {const output = this._player.lenght == 0; if(output)this.playerLos(); return output; }
  private _isSelected: boolean;
  public get isSelected():boolean { return this._isSelected; }
  public set isSelected(value) {
    this._isSelected = value;
    if(value){this.uperText.color = Color.Red; } else { this.uperText.color = Color.Black; }
  }
  public events = new EventEmitter<ActorEvents & CardPlayerEvents>();

  constructor(config?: ActorArgs, playerSprite?: Sprite){
    super(config);
    this._isSelected = false;

    this._player = new Player();
    this._player.Name = 'Player ' + this._player.id.split('-')[0];
    this.uperText = new Text({ text: this._player.Name + ' ' + this._player.lenght });

    this._playerSprite = playerSprite ?? CharsResources.Char1.toSprite();
    this._playerSprite.height = config?.height ?? this._playerSprite.height;
    this._playerSprite.width = config?.width ?? this._playerSprite.width;

    this.on('pointerdown', () => { this.onClick(); });
  }

  playerLos(){
    const losActor = new Actor({ z: 1});
    const losSprite = CharsResources.CharLos.toSprite();
    losSprite.height = this.height;
    losSprite.width = this.width;
    losActor.graphics.add(losSprite);
    this.addChild(losActor);
  }

  onInitialize(): void {
    const uperTextActor = new Actor({ pos: new Vector( 0, -75 )});
    uperTextActor.graphics.add(this.uperText);
    this.addChild(uperTextActor);

    this.graphics.add(this._playerSprite);
  }

  updateText() {
    this.uperText.text = this._player.Name + ' ' + this._player.lenght;
  }

  isOwner(card: CardActor):boolean {
    if(card._owner != undefined){
      return card._owner == this._player.id;
    } else {
      return false;
    }
  }

  setOwner(card:CardActor){
    card._owner = this._player.id;
  }

  onClick(){
    if(!this.isLos){
      this.events.emit('click', this);
    }
  }
}
