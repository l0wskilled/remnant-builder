import {ItemEffect} from "./item-effect";

export interface Trait extends ItemEffect {
  type: "Archetype Trait" | "Core Trait" | "Trait";
  maxLevelBonus: string;
  level: number;
}
