import {Component, inject, OnInit} from '@angular/core';
import {ItemsService} from "../../services/items.service";
import {StateService} from "../../services/state.service";
import {FetchService} from "../../services/fetch.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {
  readonly itemsService = inject(ItemsService);
  readonly stateService = inject(StateService);
  readonly fetchService = inject(FetchService);
  readonly location = inject(Location);

  async ngOnInit() {
    const path = this.location.path().substring(1);
    this.stateService.hash.subscribe((hash) => {
      this.location.replaceState(hash);
    });
    await this.fetchService.fetchAll();
    if (path.length > 1) {
      this.stateService.parseHash(path);
    }
  }
}
