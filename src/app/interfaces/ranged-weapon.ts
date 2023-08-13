import {Item} from "./item";

export interface RangedWeapon extends Item {
  class: string;
  baseDamage: number;
  rps: number;
  magazine: number;
  idealRange: number;
  falloffRange: number;
  maxAmmo: number;
  critChance: number;
  weakspotBonus: number;
  staggerModifier: number;
}
