import {ChangeDetectorRef, Component, inject, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../interfaces/item";
import {BehaviorSubject} from "rxjs";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() items: Item[] = [];
  @Input() preSelectedItemName: string | undefined;
  @Input() tooltipDirection: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  selectionOpen = false;
  @Input() stateProperty: "headArmor" | "bodyArmor" | "legArmor" | "gloveArmor" | "relic" | "rangedWeapon" | "rangedWeaponMod" | "rangedWeaponMutator" | "meleeWeapon" | "meleeWeaponMod" | "meleeWeaponMutator" | "rangedSecondaryWeapon" | "rangedSecondaryWeaponMod" | "rangedSecondaryWeaponMutator" | "amulet" | "ring1" | "ring2" | "ring3" | "ring4" | "archetype1" | "archetype1Skill" | "archetype2" | "archetype2Skill" = 'headArmor';
  readonly stateService = inject(StateService)

  ngOnInit() {
    const item = this.items.find(item => item.name === this.preSelectedItemName);
    // this.setSelected(item ?? this.items[0])
  }

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
