import {Component, inject, Input, Output} from '@angular/core';
import {Trait} from "../../interfaces/trait";
import {BehaviorSubject} from "rxjs";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-trait-selector',
  templateUrl: './trait-selector.component.html',
  styleUrls: ['./trait-selector.component.scss']
})
export class TraitSelectorComponent {
  @Input() traits: Trait[] = [];
  @Output() selected: BehaviorSubject<Trait[] | null> = new BehaviorSubject<Trait[] | null>(null);
  @Output() closed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchTerm: string = '';
  maxLevel = 10;
  maxSum = 65;
  readonly stateService = inject(StateService)

  close() {
    this.closed.next(true);
  }

  changeTraits(traits: Trait[]) {
    this.selected.next(traits);
    this.close();
  }

  filteredTraits(): Trait[] {
    if (!this.searchTerm) return this.traits;
    return this.traits.filter(trait => {
      let found = trait.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      if ('effect' in trait) {
        found = found || trait.effect.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      if ('maxLevelBonus' in trait) {
        found = found || trait.maxLevelBonus.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      return found;
    });
  }

  increaseTrait(trait: Trait) {
    if (!trait.level) {
      trait.level = 0;
    }
    if (trait.level >= this.maxLevel) {
      return;
    }
    trait.level++;
    if (this.stateService.traits.filter((x) => x.name === trait.name).length === 0) {
      this.stateService.traits.push(trait);
    } else {
      this.stateService.traits = this.stateService.traits.map((x) => x.name === trait.name ? trait : x);
    }
  }

  decreaseTrait(trait: Trait) {
    if (trait.level === null) {
      this.stateService.traits = this.stateService.traits.filter((x) => x.name !== trait.name);
    } else if (trait.level > 1) {
      trait.level--;
      this.stateService.traits = this.stateService.traits.map((x) => x.name === trait.name ? trait : x);
    } else {
      trait.level = 0;
      this.stateService.traits = this.stateService.traits.filter((x) => x.name !== trait.name);
    }
  }
}
