import {Item} from "./item";
import {Mod} from "./mod";

export interface MeleeWeapon extends Item {
  class: string;
  weaponMod: Mod | null;
  baseDamage: number;
  critChance: number;
  weakspotBonus: number;
  staggerModifier: number;
}
