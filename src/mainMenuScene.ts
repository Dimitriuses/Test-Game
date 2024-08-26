import { Actor, Color, Engine, Scene, vec, Vector } from 'excalibur';
import { MainLoader } from './mainLoader';
import { Button } from './shared/actors/buttonActor';
import { enumToArray } from './shared/utilites';
import { assetsToResources } from './shared/fileUtilites';

enum A{sa,sb,sc,sd};

export class MainMenu extends Scene {
  private _loaded: boolean = false;
  private basicPlayer: Actor;

  private _defaultGameButton: Button;
  private _oneCarsGameButton: Button;
  private _fileScriptButton: Button;

  constructor() {
    super();

    this.basicPlayer = new Actor({
      name: 'player', // optionally assign a name
      width: 50,
      height: 50,
      color: Color.Red,
      pos: new Vector(100, 100)
    });

    this._defaultGameButton = new Button({ width: 250, height: 50, pos: new Vector( 250, 50 ), color: Color.White }, "Default", Color.Red);
    this._defaultGameButton.events.on('click', () => { this.engine.goToScene("default"); });

    this._oneCarsGameButton = new Button({ width: 250, height: 50, pos: new Vector( 250, 150 ), color: Color.White }, "One Card", Color.Red);
    this._oneCarsGameButton.events.on('click', () => { this.engine.goToScene("oneCardGame"); });

    this._fileScriptButton = new Button({ width: 250, height: 50, pos: new Vector( 550, 500 ), color: Color.White }, "Run File Script", Color.Red);
    this._fileScriptButton.events.on('click', () => { console.log("b"); assetsToResources("./shared/assets/image/players") });

  }

  //private _startButton: StartButton;
  /**
   * Start-up logic, called once
   */

  public onPreLoad(loader: MainLoader){
    this._loaded = true;

    console.log(loader);
  }
  public onInitialize(engine: Engine) {
    //console.log("Menu init");

    engine.add(this.basicPlayer);
    engine.add(this._defaultGameButton);
    engine.add(this._oneCarsGameButton);
    //engine.add(this._fileScriptButton);

    // load scene-specific assets
    // engine.start(MainLoader).then(() => {
    //   this._loaded = true;
    // });
  }
    /**
   * Each time the scene is entered (Engine.goToScene)
   */
    public onActivate() {

      this.basicPlayer.actions.repeatForever((builder) => {
        builder.moveBy(vec(100, 0), 20);
        builder.moveBy(vec(-100, 0), 20);
      });
      
      // console.log("-------------");
      // console.log(A);
      // let keysA = enumToArray<A>(A);
      // console.log(keysA);
      // let valA = Number(A[keysA[0]]);
      // console.log(valA);
      // console.log("is this SA?");
      // console.log(A.sa === valA);
      // let a1:A = valA;
      // console.log(A.sa);
      // console.log(a1);
    }

    public onDeactivate() {
      //this.saveState();
    }
}

//export const mainMenu = new MainMenu();