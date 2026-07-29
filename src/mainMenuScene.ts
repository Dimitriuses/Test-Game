import { Actor, Color, Engine, Scene, vec, Vector } from 'excalibur';
import { Button } from './shared/actors/buttonActor';

export class MainMenu extends Scene {
  private basicPlayer: Actor;

  private _defaultGameButton: Button;
  private _oneCarsGameButton: Button;

  constructor() {
    super();

    this.basicPlayer = new Actor({
      name: 'player', // optionally assign a name
      width: 50,
      height: 50,
      color: Color.Red,
      pos: new Vector(100, 100)
    });

    this._defaultGameButton = new Button(
      { width: 250, height: 50, pos: new Vector( 250, 50 ), color: Color.White }, 'Default', Color.Red);
    this._defaultGameButton.events.on('click', () => { this.engine.goToScene('default'); });

    this._oneCarsGameButton = new Button(
      { width: 250, height: 50, pos: new Vector( 250, 150 ), color: Color.White }, 'One Card', Color.Red);
    this._oneCarsGameButton.events.on('click', () => { this.engine.goToScene('oneCardGame'); });
  }

  /**
   * Start-up logic, called once
   */
  public onInitialize(engine: Engine) {
    engine.add(this.basicPlayer);
    engine.add(this._defaultGameButton);
    engine.add(this._oneCarsGameButton);
  }

  /**
   * Each time the scene is entered (Engine.goToScene)
   */
  public onActivate() {
    this.basicPlayer.actions.repeatForever((builder) => {
      builder.moveBy(vec(100, 0), 20);
      builder.moveBy(vec(-100, 0), 20);
    });
  }
}
