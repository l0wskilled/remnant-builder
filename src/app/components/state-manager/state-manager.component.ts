import {Component, inject} from '@angular/core';
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-state-manager',
  templateUrl: './state-manager.component.html',
  styleUrls: ['./state-manager.component.scss']
})
export class StateManagerComponent {
  readonly stateService = inject(StateService)
  stateName: string = '';

  saveState() {
    if (!this.stateName) {
      return;
    }
    this.stateService.saveState(this.stateName);
    this.stateName = '';
  }

  getStates() {
    const savedStates = this.stateService.getSavedStates();
    var resultArray = Object.keys(savedStates).map(function(x){
      return savedStates[x];
    });
  }

  loadState(el: HTMLSelectElement) {
    const key = el.value;
    this.stateService.loadState(key);
  }

  deleteState(el: HTMLSelectElement) {
    const key = el.value;
    this.stateService.deleteState(key);
    if (el && el.options[0]) {
      el.options[0].selected;
    }
    console.log(el.value);
  }

  hasSavedStates() {
    return Object.keys(this.stateService.getSavedStates()).length > 0;
  }
}
