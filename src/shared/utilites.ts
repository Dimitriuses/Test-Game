import { Card, CardType, CardValue } from './classes/card';
import { CardResources } from './assets';

export function enumToArray<T>(enumme: Record<string, unknown>): T[] {
  return Object.keys(enumme).filter(a=> isNaN(Number(a)) === false).map(key=> enumme[key] as T);
}

/** Maps a Card onto the matching entry of CardResources by name, e.g. Queen + Hearts -> QueenHearts. */
export function cardToResource(card:Card){
  const cV = enumToArray(CardValue)[card.CardValue];
  if(cV === 'Joker'){
    return CardResources.Joker;
  }
  else{
    const name = enumToArray(CardValue)[card.CardValue] + '' + enumToArray(CardType)[card.CardType];
    return Object.values(CardResources)[Object.keys(CardResources).findIndex(rk=> rk == name)];
  }
}


export function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}