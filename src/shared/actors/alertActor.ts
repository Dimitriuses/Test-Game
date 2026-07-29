import { Actor, ActorArgs, Color, EventEmitter, GameEvent, Text, Vector } from 'excalibur';
import { Button } from './buttonActor';
import { ActorEvents } from 'excalibur/build/dist/Actor';

interface AlertEvents{
  opened: GameEvent<ActorEvents>;
  closed: GameEvent<ActorEvents>;
}

/** A full-screen translucent panel with a message and an OK button. */
export class Alert extends Actor{

  private _text = 'Text';
  private _textBox: Text;

  private _okButton: Button;

  public get Text(): string {return this._text;}
  public set Text(value: string) { this._text = value; this._textBox.text = value; }

  public events = new EventEmitter<ActorEvents & AlertEvents>();

  constructor(config?: ActorArgs){
    super(config);

    this._textBox = new Text({text: this._text, color: Color.White});
    const textActor = new Actor({pos: new Vector(0,0 - this.height/8)});
    textActor.graphics.use(this._textBox);
    this.addChild(textActor);

    this._okButton = new Button(
      {width: 250, height: 50, pos: new Vector(0,this.height/8), color: Color.White}, 'OK', Color.Red);
    this._okButton.events.on('click', () => { this.emit('closed'); });
    this.addChild(this._okButton);
  }
}
