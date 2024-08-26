import { ImageSource } from 'excalibur';
import { Card, CardType, CardValue } from './classes/card';
import { CardResources } from './assets';

export function enumToArray<T>(enumme):T[]{
  return Object.keys(enumme).filter(a=> isNaN(Number(a)) === false).map(key=> enumme[key]);
}

export function cardToResource(card:Card){
  let cV = enumToArray(CardValue)[card.CardValue];
  let cT = enumToArray(CardType)[card.CardType];
  //console.log(cV + "" + cT);
  if(cV === "Joker"){
    return CardResources.Joker;
  }
  else{
    return Object.values(CardResources)[Object.keys(CardResources).findIndex(rk=> rk == (enumToArray(CardValue)[card.CardValue] + "" + enumToArray(CardType)[card.CardType]))]
  }
}


export function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}