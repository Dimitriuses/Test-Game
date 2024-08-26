//declare module 'uuid'; 
import { Card } from './card';
import { v4 as uuidv4 } from 'uuid';


export class Player {
  public readonly id: string;
  private score: Number;
  private cards: Card[];

  //public get ID(): string {return this._id}
  public Name: string;
  public get Card():Card | undefined { return this.cards.shift(); };
  public get lenght():Number { return this.cards.length; };

  constructor(){
    this.id = uuidv4();
    this.score = 0;
    this.cards = [];
    this.Name = "";
    //console.log(this.id);
  }

  dealACards(card?:Card | Card[]){
    if(card != undefined){
      if(card instanceof Card){
        this.cards.push(card);
      } else {
        this.cards.push(...card);
      }
    }


  }


}