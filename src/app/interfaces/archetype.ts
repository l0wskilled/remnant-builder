import {Item} from "./item";
import {Skill} from "./skill";
import {Trait} from "./trait";

export interface Archetype extends Item {
  primePerk: string;
  archetypeTrait: Trait;
  skills: Skill[];
}
