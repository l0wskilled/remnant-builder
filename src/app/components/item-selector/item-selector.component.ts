import {Component, Input, Output} from '@angular/core';
import {Item} from "../../interfaces/item";
import {BehaviorSubject} from "rxjs";
import {ItemEffect} from "../../interfaces/item-effect";

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.scss']
})
export class ItemSelectorComponent {
  @Input() items: Item[] = [];
  @Output() selected: BehaviorSubject<Item | null> = new BehaviorSubject<Item | null>(null);
  @Output() closed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public searchTerm: string = '';

  close() {
    this.closed.next(true);
  }

  selectItem(item: Item) {
    this.selected.next(item);
    this.close();
  }

  filteredItems(): Item[] {
    if (!this.searchTerm) return this.items;
    return this.items.filter(item => {
      let found = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      if ('effect' in item) {
        found = found || (item as ItemEffect).effect.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      return found;
    });
  }
}
