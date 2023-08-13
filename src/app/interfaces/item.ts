export interface Item {
  id: number;
  name: string;
  image: string;
  category: "Amulet" | "Armor" | "MeleeWeapon" | "Mod" | "Mutator" | "RangedWeapon" | "Relic" | "Ring" | "Trait" | "Archetype" | "Skill";
}
