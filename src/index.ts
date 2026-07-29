import { DisplayMode, Engine } from 'excalibur';
import 'regenerator-runtime/runtime';
import { MainLoader } from './mainLoader';
import { MainMenu } from './mainMenuScene';
import { DefaultGameScene } from './games/default';
import { OneCardGameScene } from './games/onecard';

class Game extends Engine {
  constructor(){
    super({
      width: 800, // the width of the canvas
      height: 600, // the height of the canvas
      canvasElementId: '', // the DOM canvas element ID, if you are providing your own
      displayMode: DisplayMode.FitScreen, // the display mode
    });
  }

  initialize() {
    this.add('menu', new MainMenu());
    this.add('default', new DefaultGameScene());
    this.add('oneCardGame', new OneCardGameScene());

    this.start(new MainLoader());
    this.goToScene('menu');
  }
}

export const game = new Game();
game.initialize();
