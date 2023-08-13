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

  loadState(key: string) {
    this.stateService.loadState(key);
  }

  deleteState(key: string) {
    this.stateService.deleteState(key);
  }
}
