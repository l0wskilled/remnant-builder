export interface Item {
  name: string;
  image: string;
  category: "Amulet" | "Armor" | "MeleeWeapon" | "Mod" | "Mutator" | "RangedWeapon" | "Relic" | "Ring" | "Trait" | "Archetype" | "Skill" | "RelicFragment";
}
