import {Component, inject, Input} from '@angular/core';
import {Item} from "../../interfaces/item";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() items: Item[] = [];
  @Input() preSelectedItemName: string | undefined;
  @Input() tooltipDirection: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  selectionOpen = false;
  @Input() stateProperty: "headArmor" | "bodyArmor" | "legArmor" | "gloveArmor" | "relic" | "rangedWeapon" | "rangedWeaponMod" | "rangedWeaponMutator" | "meleeWeapon" | "meleeWeaponMod" | "meleeWeaponMutator" | "rangedSecondaryWeapon" | "rangedSecondaryWeaponMod" | "rangedSecondaryWeaponMutator" | "amulet" | "ring1" | "ring2" | "ring3" | "ring4" | "archetype1" | "archetype1Skill" | "archetype2" | "archetype2Skill" | "relicFragment1" | "relicFragment2" | "relicFragment3" = 'headArmor';
  readonly stateService = inject(StateService)

  setSelected(item: Item) {
    this.stateService[this.stateProperty] = item as any;
  }

  toggleSelection() {
    this.selectionOpen = !this.selectionOpen;
  }

  itemSelected(item: Item | null) {
    if (!item) return;
    this.setSelected(item)
    this.toggleSelection();
  }

  selectionClosed($event: boolean) {
    if ($event) {
      this.selectionOpen = false;
    }
  }
}
