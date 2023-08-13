import {Item} from "./item";
import {Effect} from "./effect";

export interface Mutator extends Item, Effect {
  distance: string;
  maxLevelBonus: string;
}
