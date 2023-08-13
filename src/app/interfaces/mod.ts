import {Item} from "./item";
import {Effect} from "./effect";

export interface Mod extends Item, Effect {
  powerRequired: number;
}
