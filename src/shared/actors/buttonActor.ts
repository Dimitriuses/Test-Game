import * as ex from 'excalibur';
import { ActorEvents } from 'excalibur/build/dist/Actor';

export interface ButtonsEvents {
  click: ex.GameEvent<ActorEvents>;
}

/**
 * A rectangle with a text label. Hovering swaps in `hoverColor`; a toggle button keeps
 * the hover colour while it is switched on instead.
 */
export class Button extends ex.Actor {
  private _text: string;
  private _textBox: ex.Text;

  private _firstColor: ex.Color;
  private _hoverColor: ex.Color;
  private _isTogle: boolean;
  private _togleStatus: boolean;
  public get TogleStatus(): boolean { return this._togleStatus; }

  public get Text(): string {return this._text;}
  public set Text(value: string) { this._text = value; this._textBox.text = value; }

  public events = new ex.EventEmitter<ActorEvents & ButtonsEvents>();

  constructor(config?: ex.ActorArgs, text?:string, hoverColor?:ex.Color, isTogle?: boolean) {
    super(config);

    this.color = config?.color ?? ex.Color.White;
    this._firstColor = this.color;
    this._hoverColor = hoverColor ?? this.color;
    this._text = text ?? 'Text';

    this._textBox = new ex.Text({text: this._text});
    const textActor: ex.Actor = new ex.Actor();
    textActor.graphics.use(this._textBox);
    this.addChild(textActor);

    this._isTogle = isTogle ?? false;
    this._togleStatus = false;

    this.on('pointerup', () => {
      this.onClick();
    });

    this.on('pointerenter', () => {
      this.onEnter();
    });

    this.on('pointerleave', () => {
      this.onLeave();
    });
  }

  private onEnter(){
    if(!this._isTogle){
      this.color = this._hoverColor;
    }
  }

  private onLeave(){
    if(!this._isTogle){
      this.color = this._firstColor;
    }
  }

  private onClick(){
    if(this._isTogle){
      if(this._togleStatus){
        this.color = this._firstColor;
        this._togleStatus = false;
      } else {
        this.color = this._hoverColor;
        this._togleStatus = true;
      }
    }
    this.events.emit('click');
  }
}
