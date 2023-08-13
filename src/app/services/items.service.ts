import {Injectable} from '@angular/core';
import {Ring} from "../interfaces/ring";
import {Amulet} from "../interfaces/amulet";
import {Armor} from "../interfaces/armor";
import {MeleeWeapon} from "../interfaces/melee-weapon";
import {Mod} from "../interfaces/mod";
import {Mutator} from "../interfaces/mutator";
import {RangedWeapon} from "../interfaces/ranged-weapon";
import {Relic} from "../interfaces/relic";
import {Trait} from "../interfaces/trait";
import {Archetype} from "../interfaces/archetype";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  public rings: Ring[] = [];
  public amulets: Amulet[] = [];
  public headArmors: Armor[] = [];
  public gloveArmors: Armor[] = [];
  public bodyArmors: Armor[] = [];
  public legArmors: Armor[] = [];
  public meleeWeapons: MeleeWeapon[] = [];
  public mods: Mod[] = [];
  public mutators: Mutator[] = []
  public rangedWeapons: RangedWeapon[] = [];
  public rangedSecondaryWeapons: RangedWeapon[] = [];
  public relics: Relic[] = [];
  public traits: Trait[] = [];
  public archetypes: Archetype[] = [];

  constructor() {
  }

  getMutatorType(distance: "Ranged" | "Melee"): Mutator[] {
    return this.mutators.filter(mutator => mutator.distance === distance);
  }
}
