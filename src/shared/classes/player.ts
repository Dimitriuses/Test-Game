import { Card } from './card';
import { v4 as uuidv4 } from 'uuid';

export class Player {
  public readonly id: string;
  private score: number;
  private cards: Card[];

  public Name: string;
  /** Reading this *removes* the front card from the hand. */
  public get Card():Card | undefined { return this.cards.shift(); }
  public get lenght():number { return this.cards.length; }

  constructor(){
    this.id = uuidv4();
    this.score = 0;
    this.cards = [];
    this.Name = '';
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
