import {inject, Injectable} from '@angular/core';
import {Armor} from "../interfaces/armor";
import {Relic} from "../interfaces/relic";
import {RangedWeapon} from "../interfaces/ranged-weapon";
import {Mod} from "../interfaces/mod";
import {Mutator} from "../interfaces/mutator";
import {MeleeWeapon} from "../interfaces/melee-weapon";
import {Amulet} from "../interfaces/amulet";
import {Ring} from "../interfaces/ring";
import {Archetype} from "../interfaces/archetype";
import {Skill} from "../interfaces/skill";
import {BehaviorSubject} from "rxjs";
import {State} from "../interfaces/state";
import {ItemsService} from "./items.service";
// @ts-ignore
import * as lz from "../../../node_modules/lz-string/libs/lz-string.js";
import {Trait} from "../interfaces/trait";

@Injectable({
  providedIn: 'root'
})
export class StateService implements State {
  hash: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly itemsService = inject(ItemsService);

  private _headArmor: Armor | undefined;

  get headArmor(): Armor | undefined {
    return this._headArmor;
  }

  set headArmor(value: Armor | undefined) {
    this._headArmor = value;
    this.hashChanged();
  }

  private _bodyArmor: Armor | undefined;

  get bodyArmor(): Armor | undefined {
    return this._bodyArmor;
  }

  set bodyArmor(value: Armor | undefined) {
    this._bodyArmor = value;
    this.hashChanged();
  }

  private _legArmor: Armor | undefined;

  get legArmor(): Armor | undefined {
    return this._legArmor;
  }

  set legArmor(value: Armor | undefined) {
    this._legArmor = value;
    this.hashChanged();
  }

  private _gloveArmor: Armor | undefined;

  get gloveArmor(): Armor | undefined {
    return this._gloveArmor;
  }

  set gloveArmor(value: Armor | undefined) {
    this._gloveArmor = value;
    this.hashChanged();
  }

  private _relic: Relic | undefined;

  get relic(): Relic | undefined {
    return this._relic;
  }

  set relic(value: Relic | undefined) {
    this._relic = value;
    this.hashChanged();
  }

  private _rangedWeapon: RangedWeapon | undefined;

  get rangedWeapon(): RangedWeapon | undefined {
    return this._rangedWeapon;
  }

  set rangedWeapon(value: RangedWeapon | undefined) {
    this._rangedWeapon = value;
    this.hashChanged();
  }

  private _rangedWeaponMod: Mod | undefined;

  get rangedWeaponMod(): Mod | undefined {
    return this._rangedWeaponMod;
  }

  set rangedWeaponMod(value: Mod | undefined) {
    this._rangedWeaponMod = value;
    this.hashChanged();
  }

  private _rangedWeaponMutator: Mutator | undefined;

  get rangedWeaponMutator(): Mutator | undefined {
    return this._rangedWeaponMutator;
  }

  set rangedWeaponMutator(value: Mutator | undefined) {
    this._rangedWeaponMutator = value;
    this.hashChanged();
  }

  private _meleeWeapon: MeleeWeapon | undefined;

  get meleeWeapon(): MeleeWeapon | undefined {
    return this._meleeWeapon;
  }

  set meleeWeapon(value: MeleeWeapon | undefined) {
    this._meleeWeapon = value;
    this.hashChanged();
  }

  private _meleeWeaponMod: Mod | undefined;

  get meleeWeaponMod(): Mod | undefined {
    return this._meleeWeaponMod;
  }

  set meleeWeaponMod(value: Mod | undefined) {
    this._meleeWeaponMod = value;
    this.hashChanged();
  }

  private _meleeWeaponMutator: Mutator | undefined;

  get meleeWeaponMutator(): Mutator | undefined {
    return this._meleeWeaponMutator;
  }

  set meleeWeaponMutator(value: Mutator | undefined) {
    this._meleeWeaponMutator = value;
    this.hashChanged();
  }

  private _rangedSecondaryWeapon: RangedWeapon | undefined;

  get rangedSecondaryWeapon(): RangedWeapon | undefined {
    return this._rangedSecondaryWeapon;
  }

  set rangedSecondaryWeapon(value: RangedWeapon | undefined) {
    this._rangedSecondaryWeapon = value;
    this.hashChanged();
  }

  private _rangedSecondaryWeaponMod: Mod | undefined;

  get rangedSecondaryWeaponMod(): Mod | undefined {
    return this._rangedSecondaryWeaponMod;
  }

  set rangedSecondaryWeaponMod(value: Mod | undefined) {
    this._rangedSecondaryWeaponMod = value;
    this.hashChanged();
  }

  private _rangedSecondaryWeaponMutator: Mutator | undefined;

  get rangedSecondaryWeaponMutator(): Mutator | undefined {
    return this._rangedSecondaryWeaponMutator;
  }

  set rangedSecondaryWeaponMutator(value: Mutator | undefined) {
    this._rangedSecondaryWeaponMutator = value;
    this.hashChanged();
  }

  private _amulet: Amulet | undefined;

  get amulet(): Amulet | undefined {
    return this._amulet;
  }

  set amulet(value: Amulet | undefined) {
    this._amulet = value;
    this.hashChanged();
  }

  private _ring1: Ring | undefined;

  get ring1(): Ring | undefined {
    return this._ring1;
  }

  set ring1(value: Ring | undefined) {
    this._ring1 = value;
    this.hashChanged();
  }

  private _ring2: Ring | undefined;

  get ring2(): Ring | undefined {
    return this._ring2;
  }

  set ring2(value: Ring | undefined) {
    this._ring2 = value;
    this.hashChanged();
  }

  private _ring3: Ring | undefined;

  get ring3(): Ring | undefined {
    return this._ring3;
  }

  set ring3(value: Ring | undefined) {
    this._ring3 = value;
    this.hashChanged();
  }

  private _ring4: Ring | undefined;

  get ring4(): Ring | undefined {
    return this._ring4;
  }

  set ring4(value: Ring | undefined) {
    this._ring4 = value;
    this.hashChanged();
  }

  private _archetype1: Archetype | undefined;

  get archetype1(): Archetype | undefined {
    return this._archetype1;
  }

  set archetype1(value: Archetype | undefined) {
    this._archetype1 = value;
    this._archetype1Skill = undefined;
    this.hashChanged();
  }

  private _archetype1Skill: Skill | undefined;

  get archetype1Skill(): Skill | undefined {
    return this._archetype1Skill;
  }

  set archetype1Skill(value: Skill | undefined) {
    this._archetype1Skill = value;
    this.hashChanged();
  }

  private _archetype2: Archetype | undefined;

  get archetype2(): Archetype | undefined {
    return this._archetype2;
  }

  set archetype2(value: Archetype | undefined) {
    this._archetype2 = value;
    this._archetype2Skill = undefined;
    this.hashChanged();
  }

  private _archetype2Skill: Skill | undefined;

  get archetype2Skill(): Skill | undefined {
    return this._archetype2Skill;
  }

  set archetype2Skill(value: Skill | undefined) {
    this._archetype2Skill = value;
    this.hashChanged();
  }

  private _traits: Trait[] = [];

  get traits(): Trait[] {
    return this._traits;
  }

  set traits(value: Trait[]) {
    this._traits = value;
    this.hashChanged();
  }

  hashChanged(): void {
    this.hash.next(this.getHash());
  }

  getHash(): string {
    const json = JSON.stringify(
      [
        this._headArmor?.name,
        this._bodyArmor?.name,
        this._legArmor?.name,
        this._gloveArmor?.name,
        this._relic?.name,
        this._rangedWeapon?.name,
        this._rangedWeaponMod?.name,
        this._rangedWeaponMutator?.name,
        this._meleeWeapon?.name,
        this._meleeWeaponMod?.name,
        this._meleeWeaponMutator?.name,
        this._rangedSecondaryWeapon?.name,
        this._rangedSecondaryWeaponMod?.name,
        this._rangedSecondaryWeaponMutator?.name,
        this._amulet?.name,
        this._ring1?.name,
        this._ring2?.name,
        this._ring3?.name,
        this._ring4?.name,
        this._archetype1?.name,
        this._archetype1Skill?.name,
        this._archetype2?.name,
        this._archetype2Skill?.name,
        this._traits.map(x => `${x?.name}:${x?.level}`).join("|")
      ]
    );
    return lz.compressToEncodedURIComponent(json);
  }

  parseHash(hash: string): void {
    const decompressed = lz.decompressFromEncodedURIComponent(hash), parsed = JSON.parse(decompressed);
    this.headArmor = this.itemsService.headArmors.find(x => x.name === parsed[0]);
    this.bodyArmor = this.itemsService.bodyArmors.find(x => x.name === parsed[1]);
    this.legArmor = this.itemsService.legArmors.find(x => x.name === parsed[2]);
    this.gloveArmor = this.itemsService.gloveArmors.find(x => x.name === parsed[3]);
    this.relic = this.itemsService.relics.find(x => x.name === parsed[4]);
    this.rangedWeapon = this.itemsService.rangedWeapons.find(x => x.name === parsed[5]);
    this.rangedWeaponMod = this.itemsService.mods.find(x => x.name === parsed[6]);
    this.rangedWeaponMutator = this.itemsService.mutators.find(x => x.name === parsed[7]);
    this.meleeWeapon = this.itemsService.meleeWeapons.find(x => x.name === parsed[8]);
    this.meleeWeaponMod = this.itemsService.mods.find(x => x.name === parsed[9]);
    this.meleeWeaponMutator = this.itemsService.mutators.find(x => x.name === parsed[10]);
    this.rangedSecondaryWeapon = this.itemsService.rangedSecondaryWeapons.find(x => x.name === parsed[11]);
    this.rangedSecondaryWeaponMod = this.itemsService.mods.find(x => x.name === parsed[12]);
    this.rangedSecondaryWeaponMutator = this.itemsService.mutators.find(x => x.name === parsed[13]);
    this.amulet = this.itemsService.amulets.find(x => x.name === parsed[14]);
    this.ring1 = this.itemsService.rings.find(x => x.name === parsed[15]);
    this.ring2 = this.itemsService.rings.find(x => x.name === parsed[16]);
    this.ring3 = this.itemsService.rings.find(x => x.name === parsed[17]);
    this.ring4 = this.itemsService.rings.find(x => x.name === parsed[18]);
    this.archetype1 = this.itemsService.archetypes.find(x => x.name === parsed[19]);
    this.archetype1Skill = this._archetype1?.skills.find(x => x.name === parsed[20]);
    this.archetype2 = this.itemsService.archetypes.find(x => x.name === parsed[21]);
    this.archetype2Skill = this._archetype2?.skills.find(x => x.name === parsed[22]);
    this.traits = parsed[23].split("|").map((x: string) => {
      const data = x.split(":");
      const trait = this.itemsService.traits.find(y => y.name === data[0]);
      if (trait) {
        trait.level = parseInt(data[1]);
      }
      return trait;
    });
  }

  saveState(key: string): void {
    let savedStates = this.getSavedStates();
    savedStates[key] = this.getHash();
    localStorage.setItem("savedStates", JSON.stringify(savedStates));
  }

  loadState(key: string): void {
    const savedStates = this.getSavedStates();
    if (savedStates[key]) {
      this.parseHash(savedStates[key]);
    }
  }

  deleteState(key: string): void {
    const savedStates = this.getSavedStates();
    delete savedStates[key];
    localStorage.setItem("savedStates", JSON.stringify(savedStates));
  }

  getSavedStates(): Record<string, string> {
    return JSON.parse(localStorage.getItem("savedStates") || "{}");
  }
}
