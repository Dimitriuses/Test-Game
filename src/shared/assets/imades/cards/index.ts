import { ImageSource } from 'excalibur';

declare module "*.png";

import twoClubs from "./2C.png";
import twoDiamonds from './2D.png';
import twoHearts from './2H.png';
import twoSpades from './2S.png';

import threeClubs from './3C.png';
import threeDiamonds from './3D.png';
import threeHearts from './3H.png';
import threeSpades from './3S.png';

import fourClubs from './4C.png';
import fourDiamonds from './4D.png';
import fourHearts from './4H.png';
import fourSpades from './4S.png';

import fiveClubs from './5C.png';
import fiveDiamonds from './5D.png';
import fiveHearts from './5H.png';
import fiveSpades from './5S.png';

import sixClubs from './6C.png';
import sixDiamonds from './6D.png';
import sixHearts from './6H.png';
import sixSpades from './6S.png';

import sevenClubs from './7C.png';
import sevenDiamonds from './7D.png';
import sevenHearts from './7H.png';
import sevenSpades from './7S.png';

import eightClubs from './8C.png';
import eightDiamonds from './8D.png';
import eightHearts from './8H.png';
import eightSpades from './8S.png';

import nineClubs from './9C.png';
import nineDiamonds from './9D.png';
import nineHearts from './9H.png';
import nineSpades from './9S.png';

import tenClubs from './tC.png';
import tenDiamonds from './tD.png';
import tenHearts from './tH.png';
import tenSpades from './tS.png';

import jackClubs from './jC.png';
import jackDiamonds from './jD.png';
import jackHearts from './jH.png';
import jackSpades from './jS.png';

import queenClubs from './qC.png';
import queenDiamonds from './qD.png';
import queenHearts from './qH.png';
import queenSpades from './qS.png';

import kingClubs from './kC.png';
import kingDiamonds from './kD.png';
import kingHearts from './kH.png';
import kingSpades from './kS.png';

import aceClubs from './aC.png';
import aceDiamonds from './aD.png';
import aceHearts from './aH.png';
import aceSpades from './aS.png';

import joker from './joker.png';
import cardBack from './cardBack.png';

export const IMAGE_CARD_HEIGHT = 190;
export const IMAGE_CARD_WIDTH = 140;



export const CardResources = {
  TwoClubs: new ImageSource(twoClubs),
  TwoDiamonds: new ImageSource(twoDiamonds),
  TwoHearts: new ImageSource(twoHearts),
  TwoSpades: new ImageSource(twoSpades),

  ThreeClubs: new ImageSource(threeClubs),
  ThreeDiamonds: new ImageSource(threeDiamonds),
  ThreeHearts: new ImageSource(threeHearts),
  ThreeSpades: new ImageSource(threeSpades),

  FourClubs: new ImageSource(fourClubs),
  FourDiamonds: new ImageSource(fourDiamonds),
  FourHearts: new ImageSource(fourHearts),
  FourSpades: new ImageSource(fourSpades),

  FiveClubs: new ImageSource(fiveClubs),
  FiveDiamonds: new ImageSource(fiveDiamonds),
  FiveHearts: new ImageSource(fiveHearts),
  FiveSpades: new ImageSource(fiveSpades),

  SixClubs: new ImageSource(sixClubs),
  SixDiamonds: new ImageSource(sixDiamonds),
  SixHearts: new ImageSource(sixHearts),
  SixSpades: new ImageSource(sixSpades),

  SevenClubs: new ImageSource(sevenClubs),
  SevenDiamonds: new ImageSource(sevenDiamonds),
  SevenHearts: new ImageSource(sevenHearts),
  SevenSpades: new ImageSource(sevenSpades),

  EightClubs: new ImageSource(eightClubs),
  EightDiamonds: new ImageSource(eightDiamonds),
  EightHearts: new ImageSource(eightHearts),
  EightSpades: new ImageSource(eightSpades),

  NineClubs: new ImageSource(nineClubs),
  NineDiamonds: new ImageSource(nineDiamonds),
  NineHearts: new ImageSource(nineHearts),
  NineSpades: new ImageSource(nineSpades),

  TenClubs: new ImageSource(tenClubs),
  TenDiamonds: new ImageSource(tenDiamonds),
  TenHearts: new ImageSource(tenHearts),
  TenSpades: new ImageSource(tenSpades),

  JackClubs: new ImageSource(jackClubs),                      
  JackDiamonds: new ImageSource(jackDiamonds),                      
  JackHearts: new ImageSource(jackHearts),                      
  JackSpades: new ImageSource(jackSpades),  

  QueenClubs: new ImageSource(queenClubs),  
  QueenDiamonds: new ImageSource(queenDiamonds),  
  QueenHearts: new ImageSource(queenHearts),  
  QueenSpades: new ImageSource(queenSpades),  

  KingClubs: new ImageSource(kingClubs),  
  KingDiamonds: new ImageSource(kingDiamonds),  
  KingHearts: new ImageSource(kingHearts),  
  KingSpades: new ImageSource(kingSpades),  

  AceClubs: new ImageSource(aceClubs),
  AceDiamonds: new ImageSource(aceDiamonds),
  AceHearts: new ImageSource(aceHearts),
  AceSpades: new ImageSource(aceSpades),

  Joker: new ImageSource(joker),
  CardBack: new ImageSource(cardBack),

} as const



enum CardValue {Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King, Joker};
enum CardType { Clubs, Diamonds, Hearts, Spades };