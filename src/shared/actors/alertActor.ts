import { Actor, Color, EventEmitter, GameEvent, Text, vec, Vector } from 'excalibur';
import { Button } from './buttonActor';
import { ActorEvents } from 'excalibur/build/dist/Actor';

interface AlertEvents{
  opened: GameEvent<ActorEvents>;
  closed: GameEvent<ActorEvents>;
}

export class Alert extends Actor{

  private _text: string = "Text";
  private _textBox: Text;

  private _okButton: Button;


  public get Text(): string {return this._text};
  public set Text(value: string) { this._text = value; this._textBox.text = value;};

  public events = new EventEmitter<ActorEvents & AlertEvents>();
  constructor(config?: ex.ActorArgs){
    super(config);

    //this.color = config?.color || Color.fromRGB(1,1,1,1);

    this._textBox = new Text({text: this._text, color: Color.White});
    //const textActor = new Actor({pos: new Vector(this.width/2, (this.height/8)*3)});
    const textActor = new Actor({pos: new Vector(0,0 - this.height/8)});
    textActor.graphics.use(this._textBox);
    this.addChild(textActor);

    //this._okButton = new Button({width: 250, height: 50, pos: new Vector(this.width/2, (this.height/4)*3), color: Color.White}, "OK", Color.Red);
    this._okButton = new Button({width: 250, height: 50, pos: new Vector(0,this.height/8), color: Color.White}, "OK", Color.Red);
    this._okButton.events.on("click", () => { this.emit("closed") })
    this.addChild(this._okButton);
  }

}