//import { Actor, Color, vec, Vector } from 'excalibur';
import * as ex from 'excalibur';
import { ActorEvents } from 'excalibur/build/dist/Actor';

export interface ButtonsEvents {
  click: ex.GameEvent<ActorEvents>;
}

export class Button extends ex.Actor {
  private _text: string;
  private _textBox: ex.Text;
  //private isCliced: boolean = false;

  private _firstColor: ex.Color;
  private _hoverColor: ex.Color;


  public get Text(): string {return this._text};
  public set Text(value: string) { this._text = value; this._textBox.text = value;};

  public events = new ex.EventEmitter<ActorEvents & ButtonsEvents>();
  constructor(config?: ex.ActorArgs, text?:string, hoverColor?:ex.Color) {
    super(config);
    this.color = config?.color ?? ex.Color.White;
    this._firstColor = this.color;
    this._hoverColor = hoverColor ?? this.color;
    this._text = text ?? "Text";

    this._textBox = new ex.Text({text: this._text});
    const textActor: ex.Actor = new ex.Actor();
    textActor.graphics.use(this._textBox);
    this.addChild(textActor);
    
    this.on('pointerup', () => {
      //alert("I've been clicked")
      this.onClick();
    })
 
    this.on('pointerenter', () => {
      //console.log('enter');
      this.onEnter();
    });
  
    this.on('pointerleave', () => {
      //console.log('leave');
      this.onLeave();
    });

    
  }

  private onEnter(){
    // if(!this.isCliced){
    // }
    this.color = this._hoverColor;
  }

  private onLeave(){
    // if(!this.isCliced){
    // }
    this.color = this._firstColor;
  }

  private onClick(){
    //this.isCliced = true;
    //this.color = ex.Color.Magenta;
    this.events.emit("click");
  }




}

