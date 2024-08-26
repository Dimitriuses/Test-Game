import { ImageSource } from 'excalibur';
import { enumToArray } from '../utilites';

export enum CardValue {Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King, Joker};
const HIGER_THEN_KING_AND_LOWER_THEN_JOKER = 12.5;
export enum CardType { Clubs, Diamonds, Hearts, Spades };
//export enum CardAceRules { AceIsTheHighest, AceIsTheLowest};
export enum CardComparisonOperator { HigerThen, HigerOrEqualThen, Equal, LowerOrEqualThen, LowerThen };
export class Card {

  public CardValue: CardValue;
  public CardType: CardType;

  constructor(cardValue: CardValue, cardType: CardType){
    this.CardValue = cardValue;
    this.CardType = cardType;
  }

  public isCard(operator: CardComparisonOperator, card: Card, isAceIsTheLowest: boolean = true): boolean{

    let a = (!isAceIsTheLowest && this.CardValue == CardValue.Ace)? HIGER_THEN_KING_AND_LOWER_THEN_JOKER : this.CardValue.valueOf();
    let b = (!isAceIsTheLowest && card.CardValue == CardValue.Ace)? HIGER_THEN_KING_AND_LOWER_THEN_JOKER : card.CardValue.valueOf();

    switch (operator) {
      case CardComparisonOperator.HigerThen:
        return a>b;
        break;
      case CardComparisonOperator.HigerOrEqualThen:
        return a>=b;
        break;
      case CardComparisonOperator.Equal:
        return a==b;
        break;
      case CardComparisonOperator.LowerOrEqualThen:
        return a<=b;
        break;
      case CardComparisonOperator.LowerThen:
        return a<b;
        break;
      default: 
        break;
    }

    return false;
  }

  public toString(): string {
    return enumToArray<CardValue>(CardValue)[this.CardValue] + " " + enumToArray<CardType>(CardType)[this.CardType];
  }
  
}

export enum CardDeckType { Deck36, Deck48, Deck52}

export interface CardDeckArgs {
  deckType?: CardDeckType;
  cards?: Card[];

}

export class CardDeck {
  private _cards: Card[];

  public get Cards() { return this._cards }
  public get lenght():number { return this._cards.length };
  
  constructor(config?: CardDeckArgs){
    this._cards = config?.cards ?? [];
    
    if(config?.deckType !== undefined && this._cards.length == 0){
      this.setCards(config.deckType);
    }

  }

  private setCards(type: CardDeckType){
    let keysT = enumToArray<CardType>(CardType);
    let keysV = enumToArray<CardValue>(CardValue);

    //console.log(keysT);
    //console.log(keysV);

    for(let i = 0; i<keysT.length; i++){
      for(let j = 0; j<keysV.length; j++){
        let cType:CardType = Number(CardType[keysT[i]]);
        let cValue:CardValue = Number(CardValue[keysV[j]]);

        let r1 = 
          type === CardDeckType.Deck36 && 
          cValue != CardValue.Two && 
          cValue != CardValue.Three && 
          cValue != CardValue.Four && 
          cValue != CardValue.Five && 
          cValue != CardValue.Joker;
        let r2 = 
          type === CardDeckType.Deck48 &&
          cValue != CardValue.Joker;
        let r3 = type === CardDeckType.Deck52;

        if(r1 || r2 || r3){
          let card = new Card(cValue, cType);
          this._cards.push(card);
        }
        
      }
    }
  }

  public getFirstCard(){
    return this._cards.pop();
  }
  
  public sort() {
    this._cards.sort(a=> a.CardValue.valueOf());
  }

  public shuffle (): void {
    this._cards.sort(a=> Math.random() - 0.5);
  }

  public returnToLogAllCards(){
    this._cards.forEach(c=> console.log(c.toString()));
  }



}