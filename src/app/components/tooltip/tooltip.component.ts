import {Component} from '@angular/core';
import {Item} from "../../interfaces/item";
import {Effect} from "../../interfaces/effect";
import {Armor} from "../../interfaces/armor";
import {MeleeWeapon} from "../../interfaces/melee-weapon";
import {RangedWeapon} from "../../interfaces/ranged-weapon";
import {Mod} from "../../interfaces/mod";
import {Mutator} from "../../interfaces/mutator";
import {Trait} from "../../interfaces/trait";
import {Ring} from "../../interfaces/ring";
import {Archetype} from "../../interfaces/archetype";
import {Skill} from "../../interfaces/skill";
import {Relic} from "../../interfaces/relic";
import {Amulet} from "../../interfaces/amulet";
import {RelicFragment} from "../../interfaces/relic-fragment";

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  item: Item | null = null;
  left: number = 0;
  top: number = 0;
  direction: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  isMod(item: Item): item is Mod {
    return item.category === 'Mod';
  }

  asMod(item: Item): Mod {
    return item as Mod;
  }

  isMutator(item: Item): item is Mutator {
    return item.category === 'Mutator';
  }

  asMutator(item: Item): Mutator {
    return item as Mutator;
  }

  isTrait(item: Item): item is Trait {
    return item.category === 'Trait';
  }

  asTrait(item: Item): Trait {
    return item as Trait;
  }

  isRing(item: Item): item is Ring {
    return item.category === 'Ring';
  }

  asRing(item: Item): Ring {
    return item as Ring;
  }

  isRelic(item: Item): item is Relic {
    return item.category === 'Relic';
  }

  isRelicFragment(item: Item): item is RelicFragment {
    return item.category === 'RelicFragment';
  }

  isAmulet(item: Item): item is Amulet {
    return item.category === 'Amulet';
  }

  isArmor(item: Item): item is Armor {
    return item.category === 'Armor';
  }

  asArmor(item: Item): Armor {
    return item as Armor;
  }

  isMeleeWeapon(item: Item): item is MeleeWeapon {
    return item.category === 'MeleeWeapon';
  }

  asMeleeWeapon(item: Item): MeleeWeapon {
    return item as MeleeWeapon;
  }

  isRangedWeapon(item: Item): item is RangedWeapon {
    return item.category === 'RangedWeapon';
  }

  asRangedWeapon(item: Item): RangedWeapon {
    return item as RangedWeapon;
  }

  isArchetype(item: Item): item is Archetype {
    return item.category === 'Archetype';
  }

  asArchetype(item: Item): Archetype {
    return item as Archetype;
  }

  isSkill(item: Item): item is Skill {
    return item.category === 'Skill';
  }

  asSkill(item: Item): Skill {
    return item as Skill;
  }
}
