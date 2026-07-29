import { enumToArray } from '../utilites';

export enum CardValue {Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King, Joker}
const HIGER_THEN_KING_AND_LOWER_THEN_JOKER = 12.5;
export enum CardType { Clubs, Diamonds, Hearts, Spades }
export enum CardComparisonOperator { HigerThen, HigerOrEqualThen, Equal, LowerOrEqualThen, LowerThen }

export class Card {

  public CardValue: CardValue;
  public CardType: CardType;

  constructor(cardValue: CardValue, cardType: CardType){
    this.CardValue = cardValue;
    this.CardType = cardType;
  }

  public isCard(operator: CardComparisonOperator, card: Card, isAceIsTheLowest = true): boolean{

    const aceHigh = HIGER_THEN_KING_AND_LOWER_THEN_JOKER;
    const a = (!isAceIsTheLowest && this.CardValue == CardValue.Ace)? aceHigh : this.CardValue.valueOf();
    const b = (!isAceIsTheLowest && card.CardValue == CardValue.Ace)? aceHigh : card.CardValue.valueOf();

    switch (operator) {
    case CardComparisonOperator.HigerThen:
      return a>b;
    case CardComparisonOperator.HigerOrEqualThen:
      return a>=b;
    case CardComparisonOperator.Equal:
      return a==b;
    case CardComparisonOperator.LowerOrEqualThen:
      return a<=b;
    case CardComparisonOperator.LowerThen:
      return a<b;
    default:
      break;
    }

    return false;
  }

  public toString(): string {
    return enumToArray<CardValue>(CardValue)[this.CardValue] + ' ' + enumToArray<CardType>(CardType)[this.CardType];
  }

}

export enum CardDeckType { Deck36, Deck48, Deck52}

export interface CardDeckArgs {
  deckType?: CardDeckType;
  cards?: Card[];
}

export class CardDeck {
  private _cards: Card[];

  public get Cards() { return this._cards; }
  public get lenght():number { return this._cards.length; }

  constructor(config?: CardDeckArgs){
    this._cards = config?.cards ?? [];

    if(config?.deckType !== undefined && this._cards.length == 0){
      this.setCards(config.deckType);
    }
  }

  /*
   * Known defect, left as written in 2024 — only Deck36 produces the size its name claims.
   * CardValue has 14 members, so excluding just the Joker leaves 13 values x 4 suits = 52,
   * and excluding nothing leaves 56 including four Jokers that all draw the one joker.png.
   *   Deck36 -> 36   Deck48 -> 52   Deck52 -> 56 (4 jokers)
   * The One Card scene asks for Deck48, which is why four players are dealt 13 cards each.
   */
  private setCards(type: CardDeckType){
    const keysT = enumToArray<CardType>(CardType);
    const keysV = enumToArray<CardValue>(CardValue);

    for(let i = 0; i<keysT.length; i++){
      for(let j = 0; j<keysV.length; j++){
        const cType:CardType = Number(CardType[keysT[i]]);
        const cValue:CardValue = Number(CardValue[keysV[j]]);

        const r1 =
          type === CardDeckType.Deck36 &&
          cValue != CardValue.Two &&
          cValue != CardValue.Three &&
          cValue != CardValue.Four &&
          cValue != CardValue.Five &&
          cValue != CardValue.Joker;
        const r2 =
          type === CardDeckType.Deck48 &&
          cValue != CardValue.Joker;
        const r3 = type === CardDeckType.Deck52;

        if(r1 || r2 || r3){
          const card = new Card(cValue, cType);
          this._cards.push(card);
        }
      }
    }
  }

  /** Despite the name this returns the *last* card, because it pops. */
  public getFirstCard(){
    return this._cards.pop();
  }

  /*
   * Known defect, left as written in 2024. Array.sort passes a comparator two elements;
   * both of these callbacks take only the first, so neither compares anything.
   *   sort()    is a complete no-op (measured: unchanged in 20,000 / 20,000 decks).
   *   shuffle() is heavily biased (measured over 100,000 shuffles of a 36-card deck, the
   *             top card stays put 7.39% of the time and reaches the bottom 1.62%, against
   *             2.78% for both under a real Fisher-Yates shuffle).
   * See "Known limitations" in the README.
   */
  public sort() {
    this._cards.sort(a=> a.CardValue.valueOf());
  }

  public shuffle (): void {
    // Kept verbatim: the unused `a` is the defect itself, described above.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this._cards.sort(a=> Math.random() - 0.5);
  }

  public returnToLogAllCards(){
    this._cards.forEach(c=> console.log(c.toString()));
  }
}
