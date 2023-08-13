import {Item} from "./item";
import {Effect} from "./effect";

export interface Trait extends Item, Effect {
  type: "Archetype Trait" | "Core Trait" | "Trait";
  maxLevelBonus: string;
}
