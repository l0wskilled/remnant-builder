import {Item} from "./item";

export interface Armor extends Item {
  armor: number;
  weight: number;
  bleedResist: number;
  fireResist: number;
  shockResist: number;
  blightResist: number;
  toxinResist: number;
}
