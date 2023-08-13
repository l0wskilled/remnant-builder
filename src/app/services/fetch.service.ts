import {inject, Injectable} from '@angular/core';
import {Relic} from "../interfaces/relic";
import {ItemsService} from "./items.service";
import {Armor} from "../interfaces/armor";
import {Item} from "../interfaces/item";
import {RangedWeapon} from "../interfaces/ranged-weapon";
import {MeleeWeapon} from "../interfaces/melee-weapon";
import {Ring} from "../interfaces/ring";
import {Amulet} from "../interfaces/amulet";
import {Mod} from "../interfaces/mod";
import {Mutator} from "../interfaces/mutator";
import {Trait} from "../interfaces/trait";
import {Skill} from "../interfaces/skill";
import {Archetype} from "../interfaces/archetype";

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  fetching = true;
  private readonly itemsService = inject(ItemsService);
  private lastUpdated: Date | undefined;
  private currentId = 1;

  private get needsUpdate() {
    const lastUpdate = this.getLastUpdate();
    const now = new Date();
    const diff = now.getTime() - lastUpdate.getTime();
    const diffHours = Math.floor(diff / 1000 / 60 / 60);
    return diffHours > 24;
  }

  async fetchAll() {
    await this.fetchRelics();
    await this.fetchHeadArmors();
    await this.fetchBodyArmors();
    await this.fetchLegArmors();
    await this.fetchGloveArmors();
    await this.fetchRangedWeapons()
    await this.fetchMeleeWeapons();
    await this.fetchRings();
    await this.fetchAmulets();
    await this.fetchMods();
    await this.fetchMutators();
    await this.fetchRangedSecondaryWeapons();
    await this.fetchTraits();
    await this.fetchArchetypes();

    this.fetching = false;
  }

  public setLastUpdate() {
    localStorage.setItem('lastUpdate', JSON.stringify(new Date()));
  }

  private getId() {
    return this.currentId++;
  }

  private getLastUpdate(): Date {
    if (this.lastUpdated) {
      return this.lastUpdated;
    }
    const lastUpdate = localStorage.getItem('lastUpdate');
    if (lastUpdate) {
      this.lastUpdated = new Date(JSON.parse(lastUpdate));
    } else {
      this.lastUpdated = new Date("2021-10-01T00:00:00.000Z");
    }
    return this.lastUpdated;
  }

  private getCachedData(key: string): Array<Item> {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  }

  private cache(data: any, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
    this.setLastUpdate();
  }

  private async fetch(url: string): Promise<HTMLDocument> {
    const response = await fetch(url);
    const parser = new DOMParser();
    const text = await response.text();
    return parser.parseFromString(text, 'text/html');
  }

  private formatImageSrc(x: Element | null): string {
    const src = x?.getAttribute('src') ?? '';
    return this.formatUrl(src?.match(/\/file.*/g)?.at(0) ?? '');
  }

  private formatThumbnail(x: Element | null): string {
    const url = this.formatImageSrc(x);
    return url.replace("75px", "200px");
  }

  private formatUrl(path: string): string {
    return 'https://remnant2.wiki.fextralife.com' + path;
  }

  private async getData(url: string): Promise<Element[]> {
    const html = await this.fetch(url);
    const tr = html.querySelector('table.wiki_table.sortable.searchable')?.querySelectorAll('tbody tr')
    return Array.from(tr ?? []);
  }

  private async getArcheTypeData(url: string): Promise<Archetype[]> {
    const html = await this.fetch(url);
    const allTab = Array.from(html.querySelectorAll('div.tabcontent.All-tab a.wiki_link'));
    const archetypes: Archetype[] = [];
    for (const x of allTab) {
      const link = this.formatUrl(this.getLink(x));
      const archetypeHtml = await this.fetch(link);

      const wikiLinks = archetypeHtml.querySelectorAll('table.wiki_table a.wiki_link');
      const wikiLinksSkills = Array.from(archetypeHtml.querySelectorAll('div.row a.wiki_link'));
      const skills: Array<Skill> = [
        {
          id: this.getId(),
          category: 'Skill',
          name: this.getText(wikiLinksSkills[wikiLinksSkills.length - 5]),
          image: this.formatThumbnail(wikiLinksSkills[wikiLinksSkills.length - 5].querySelector('img')),
        },
        {
          id: this.getId(),
          category: 'Skill',
          name: this.getText(wikiLinksSkills[wikiLinksSkills.length - 4]),
          image: this.formatThumbnail(wikiLinksSkills[wikiLinksSkills.length - 4].querySelector('img')),
        },
        {
          id: this.getId(),
          category: 'Skill',
          name: this.getText(wikiLinksSkills[wikiLinksSkills.length - 3]),
          image: this.formatThumbnail(wikiLinksSkills[wikiLinksSkills.length - 3].querySelector('img')),
        }
      ];
      archetypes.push({
        id: this.getId(),
        category: 'Archetype',
        name: this.getText(x),
        image: this.formatImageSrc(x.querySelector('img')),
        primePerk: this.getText(wikiLinks[1]),
        archetypeTrait: this.itemsService.traits.find(y => y.name === wikiLinks[2].textContent)!,
        skills: skills,
      });
    }
    return archetypes;
  }

  private getText(x: Element | null): string {
    return x?.textContent ?? '';
  }

  private getLink(x: Element | null): string {
    return x?.getAttribute('href') ?? '';
  }

  private getHtml(x: Element | null): string {
    return x?.innerHTML ?? '';
  }

  private getNumber(x: Element | null): number {
    return Number(this.getText(x).match(/[0-9-+]*/g)?.at(0));
  }

  private async fetchRelics() {
    if (!this.needsUpdate) {
      this.itemsService.relics = this.getCachedData('relics') as Array<Relic>;
      if (this.itemsService.relics.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Relics");
    const items = data.map(x => ({
      id: this.getId(),
      category: "Relic",
      name: this.getText(x.querySelector('.wiki_link')),
      image: this.formatImageSrc(x.querySelector('img')),
      effect: this.getHtml(x.querySelectorAll('td')[1]),
    } as Relic));
    this.cache(items, 'relics');
    this.itemsService.relics = items;
  }

  private getRangedWeapon(x: Element): RangedWeapon {
    return {
      id: this.getId(),
      category: "RangedWeapon",
      name: this.getText(x.querySelector('.wiki_link')),
      image: this.formatImageSrc(x.querySelector('img')),
      class: this.getText(x.querySelectorAll('td')[1]),
      baseDamage: this.getNumber(x.querySelectorAll('td')[3]),
      rps: this.getNumber(x.querySelectorAll('td')[4]),
      magazine: this.getNumber(x.querySelectorAll('td')[5]),
      idealRange: this.getNumber(x.querySelectorAll('td')[6]),
      falloffRange: this.getNumber(x.querySelectorAll('td')[7]),
      maxAmmo: this.getNumber(x.querySelectorAll('td')[8]),
      critChance: this.getNumber(x.querySelectorAll('td')[9]),
      weakspotBonus: this.getNumber(x.querySelectorAll('td')[10]),
      staggerModifier: this.getNumber(x.querySelectorAll('td')[11]),
    }
  }

  private getArmor(x: Element): Armor {
    return {
      id: this.getId(),
      category: "Armor",
      name: this.getText(x.querySelector('.wiki_link')),
      image: this.formatImageSrc(x.querySelector('img')),
      armor: Number(this.getText(x.querySelectorAll('td')[2])),
      weight: Number(this.getText(x.querySelectorAll('td')[3])),
      bleedResist: Number(this.getText(x.querySelectorAll('td')[4])),
      fireResist: Number(this.getText(x.querySelectorAll('td')[5])),
      shockResist: Number(this.getText(x.querySelectorAll('td')[6])),
      blightResist: Number(this.getText(x.querySelectorAll('td')[7])),
      toxinResist: Number(this.getText(x.querySelectorAll('td')[8])),
    };
  }

  private async fetchHeadArmors() {
    if (!this.needsUpdate) {
      this.itemsService.headArmors = this.getCachedData('headArmors') as Array<Armor>;
      if (this.itemsService.headArmors.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Head+Armor");
    const items = data.map(x => this.getArmor(x));
    this.cache(items, 'headArmors');
    this.itemsService.headArmors = items;
  }

  private async fetchBodyArmors() {
    if (!this.needsUpdate) {
      this.itemsService.bodyArmors = this.getCachedData('bodyArmors') as Array<Armor>;
      if (this.itemsService.bodyArmors.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Body+Armor");
    const items = data.map(x => this.getArmor(x));
    this.cache(items, 'bodyArmors');
    this.itemsService.bodyArmors = items;
  }

  private async fetchLegArmors() {
    if (!this.needsUpdate) {
      this.itemsService.legArmors = this.getCachedData('legArmors') as Array<Armor>;
      if (this.itemsService.legArmors.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Leg+Armor");
    const items = data.map(x => this.getArmor(x));
    this.cache(items, 'legArmors');
    this.itemsService.legArmors = items;
  }

  private async fetchGloveArmors() {
    if (!this.needsUpdate) {
      this.itemsService.gloveArmors = this.getCachedData('gloveArmors') as Array<Armor>;
      if (this.itemsService.gloveArmors.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Gloves");
    const items = data.map(x => this.getArmor(x));
    this.cache(items, 'gloveArmors');
    this.itemsService.gloveArmors = items;
  }

  private async fetchRangedWeapons() {
    if (!this.needsUpdate) {
      this.itemsService.rangedWeapons = this.getCachedData('rangedWeapons') as Array<RangedWeapon>;
      if (this.itemsService.rangedWeapons.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Long+Guns");
    const items = data.map(x => this.getRangedWeapon(x));
    this.cache(items, 'rangedWeapons');
    this.itemsService.rangedWeapons = items;
  }

  private async fetchMeleeWeapons() {
    if (!this.needsUpdate) {
      this.itemsService.meleeWeapons = this.getCachedData('meleeWeapons') as Array<MeleeWeapon>;
      if (this.itemsService.meleeWeapons.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Melee+Weapons");
    const items = data.map(x => ({
      id: this.getId(),
      category: "MeleeWeapon",
      name: this.getText(x.querySelector('.wiki_link')),
      image: this.formatImageSrc(x.querySelector('img')),
      class: this.getText(x.querySelectorAll('td')[1]),
      weaponMod: null,
      baseDamage: this.getNumber(x.querySelectorAll('td')[3]),
      critChance: this.getNumber(x.querySelectorAll('td')[9]),
      weakspotBonus: this.getNumber(x.querySelectorAll('td')[10]),
      staggerModifier: this.getNumber(x.querySelectorAll('td')[11]),
    } as MeleeWeapon));
    this.cache(items, 'meleeWeapons');
    this.itemsService.meleeWeapons = items;
  }

  private async fetchRings() {
    if (!this.needsUpdate) {
      this.itemsService.rings = this.getCachedData('rings') as Array<Ring>;
      if (this.itemsService.rings.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Rings");
    const items = data.map(x => ({
      id: this.getId(),
      category: "Ring",
      name: this.getText(x.querySelector('.wiki_link')),
      image: this.formatImageSrc(x.querySelector('img')),
      effect: this.getHtml(x.querySelectorAll('td')[1]),
    } as Ring));
    this.cache(items, 'rings');
    this.itemsService.rings = items;
  }

  private async fetchAmulets() {
    if (!this.needsUpdate) {
      this.itemsService.amulets = this.getCachedData('amulets') as Array<Amulet>;
      if (this.itemsService.amulets.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Amulets");
    const items = data.map(x => ({
      id: this.getId(),
      category: "Amulet",
      name: this.getText(x.querySelector('.wiki_link')),
      image: this.formatImageSrc(x.querySelector('img')),
      effect: this.getHtml(x.querySelectorAll('td')[1]),
    } as Amulet));
    this.cache(items, 'amulets');
    this.itemsService.amulets = items;
  }

  private async fetchMods() {
    if (!this.needsUpdate) {
      this.itemsService.mods = this.getCachedData('mods') as Array<Mod>;
      if (this.itemsService.mods.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Weapon+Mods");
    const items = data.map(x => ({
      id: this.getId(),
      category: "Mod",
      name: this.getText(x.querySelector('.wiki_link')),
      image: this.formatImageSrc(x.querySelector('img')),
      effect: this.getHtml(x.querySelectorAll('td')[1]),
      powerRequired: this.getNumber(x.querySelectorAll('td')[2]),
    } as Mod));
    this.cache(items, 'mods');
    this.itemsService.mods = items;
  }

  private async fetchMutators() {
    if (!this.needsUpdate) {
      this.itemsService.mutators = this.getCachedData('mutators') as Array<Mutator>;
      if (this.itemsService.mutators.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Mutators");
    const items = data.map(x => ({
      id: this.getId(),
      category: "Mutator",
      distance: this.getText(x.querySelectorAll('td')[1]),
      name: this.getText(x.querySelector('.wiki_link')),
      image: this.formatImageSrc(x.querySelector('img')),
      effect: this.getHtml(x.querySelectorAll('td')[2]),
      maxLevelBonus: this.getHtml(x.querySelectorAll('td')[3]),
    } as Mutator));
    this.cache(items, 'mutators');
    this.itemsService.mutators = items;
  }

  private async fetchRangedSecondaryWeapons() {
    if (!this.needsUpdate) {
      this.itemsService.rangedSecondaryWeapons = this.getCachedData('rangedSecondaryWeapons') as Array<RangedWeapon>;
      if (this.itemsService.rangedSecondaryWeapons.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Handguns");
    const items = data.map(x => this.getRangedWeapon(x));
    this.cache(items, 'rangedSecondaryWeapons');
    this.itemsService.rangedSecondaryWeapons = items;
  }

  private async fetchTraits() {
    if (!this.needsUpdate) {
      this.itemsService.traits = this.getCachedData('traits') as Array<Trait>;
      if (this.itemsService.traits.length > 0) {
        return;
      }
    }
    const data = await this.getData("https://remnant2.wiki.fextralife.com/Traits");
    const items = data.map(x => ({
      id: this.getId(),
      category: "Trait",
      name: this.getText(x.querySelector('.wiki_link')),
      image: this.formatImageSrc(x.querySelector('img')),
      type: this.getText(x.querySelectorAll('td')[1]),
      effect: this.getHtml(x.querySelectorAll('td')[2]),
      maxLevelBonus: this.getHtml(x.querySelectorAll('td')[3]),
    } as Trait));
    this.cache(items, 'traits');
    this.itemsService.traits = items;
  }

  private async fetchArchetypes() {
    if (!this.needsUpdate) {
      this.itemsService.archetypes = this.getCachedData('archetypes') as Array<Archetype>;
      if (this.itemsService.archetypes.length > 0) {
        return;
      }
    }
    const items = await this.getArcheTypeData("https://remnant2.wiki.fextralife.com/Classes");
    this.cache(items, 'archetypes');
    this.itemsService.archetypes = items;
  }
}
