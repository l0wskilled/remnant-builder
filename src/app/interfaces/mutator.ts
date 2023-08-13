import {ItemEffect} from "./item-effect";

export interface Mutator extends ItemEffect {
  distance: string;
  maxLevelBonus: string;
}
