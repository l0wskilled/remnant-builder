import {Mutator} from "./mutator";
import {Mod} from "./mod";
import {MeleeWeapon} from "./melee-weapon";
import {RangedWeapon} from "./ranged-weapon";
import {Relic} from "./relic";
import {Armor} from "./armor";
import {Ring} from "./ring";
import {Amulet} from "./amulet";
import {Archetype} from "./archetype";
import {Skill} from "./skill";

export interface State {
  archetype1: Archetype | undefined;
  archetype1Skill: Skill | undefined;
  archetype2: Archetype | undefined;

  archetype2Skill: Skill | undefined;
  headArmor: Armor | undefined;
  bodyArmor: Armor | undefined;
  legArmor: Armor | undefined;
  gloveArmor: Armor | undefined;
  relic: Relic | undefined;
  amulet: Amulet | undefined;
  ring1: Ring | undefined;
  ring2: Ring | undefined;
  ring3: Ring | undefined;
  ring4: Ring | undefined;
  rangedWeapon: RangedWeapon | undefined;
  rangedWeaponMod: Mod | undefined;
  rangedWeaponMutator: Mutator | undefined;
  meleeWeapon: MeleeWeapon | undefined;
  meleeWeaponMod: Mod | undefined;
  meleeWeaponMutator: Mutator | undefined;
  rangedSecondaryWeapon: RangedWeapon | undefined;
  rangedSecondaryWeaponMod: Mod | undefined;
  rangedSecondaryWeaponMutator: Mutator | undefined;
}
