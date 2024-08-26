import { DisplayMode, Engine, FadeInOut } from 'excalibur';
import "regenerator-runtime/runtime";
import {  MainLoader } from './mainLoader';
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
      //pointerScope: ex.Input.PointerScope.Document // the scope of capturing pointer (mouse/touch) events
      scenes: {
        // root:{
        //   scene: mainMenu,
        //   loader: mainLoader,
        //   transitions: {
        //     out: new FadeInOut({
        //       duration: 300,
        //       direction: 'out',
        //     }),
        //     in: new FadeInOut({ duration: 300, direction: 'in' }),
        //   },
        // },
        // menu: {
        //   scene: MainMenu,
        //   loader: mainLoader
        // }
      }
    });

  }

  initialize() {
    //this.add(player);
    this.add("menu", new MainMenu());
    this.add("default", new DefaultGameScene());
    this.add("oneCardGame", new OneCardGameScene());
    
    this.start(new MainLoader());
    this.goToScene('menu');
  }

}

export const game = new Game();
game.initialize();