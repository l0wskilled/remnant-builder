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
import meleeWeaponsJson from "../items/meleeWeapons.json";
import legArmorJson from "../items/legArmor.json";
import bodyArmorJson from "../items/bodyArmor.json";
import gloveArmorJson from "../items/gloveArmor.json";
import headArmorJson from "../items/headArmor.json";
import amuletsJson from "../items/amulets.json";
import ringsJson from "../items/rings.json";
import relicsJson from "../items/relics.json";
import rangedWeaponsJson from "../items/rangedWeapons.json";
import rangedSecondaryWeaponsJson from "../items/rangedSecondaryWeapons.json";
import modsJson from "../items/mods.json";
import mutationsJson from "../items/mutations.json";
import traitsJson from "../items/traits.json";
import {Archetype} from "../interfaces/archetype";
import classesJson from "../items/classes.json";

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
  public traits: Trait[] = traitsJson as Trait[];
  public archetypes: Archetype[] = [];

  getMutatorType(distance: "Ranged" | "Melee"): Mutator[] {
    return this.mutators.filter(mutator => mutator.distance === distance);
  }

  constructor() {
  }
}
