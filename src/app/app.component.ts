import {Component, inject} from '@angular/core';
import {FetchService} from "./services/fetch.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly fetchService = inject(FetchService);
}
