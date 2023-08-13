import {Component, inject, Input} from '@angular/core';
import {Trait} from "../../interfaces/trait";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-trait-list',
  templateUrl: './trait-list.component.html',
  styleUrls: ['./trait-list.component.scss']
})
export class TraitListComponent {
  @Input() traits: Trait[] = [];
  selectionOpen = false;
  readonly stateService = inject(StateService)

  toggleSelection() {
    this.selectionOpen = !this.selectionOpen;
  }

  selectionClosed($event: boolean) {
    if ($event) {
      this.selectionOpen = false;
    }
  }

  itemSelected(traits: Trait[] | null) {
    if (!traits) return;
    this.setSelected(traits)
    this.toggleSelection();
  }

  setSelected(traits: Trait[]) {
    this.stateService.traits = traits;
  }
}
