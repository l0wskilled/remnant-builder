import {Component, Input} from '@angular/core';
import {Trait} from "../../interfaces/trait";

@Component({
  selector: 'app-trait',
  templateUrl: './trait.component.html',
  styleUrls: ['./trait.component.scss']
})
export class TraitComponent {
  @Input() trait: Trait | undefined;

  createRange(number: number){
    return new Array(number);
  }
}
