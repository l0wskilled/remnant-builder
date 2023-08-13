import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CharacterSheetComponent} from './components/character-sheet/character-sheet.component';
import {ItemComponent} from './components/item/item.component';
import {ItemSelectorComponent} from './components/item-selector/item-selector.component';
import {TooltipComponent} from './components/tooltip/tooltip.component';
import {TooltipDirective} from './directives/tooltip.directive';
import {FormsModule} from "@angular/forms";
import {SpinnerComponent} from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent,
    ItemComponent,
    ItemSelectorComponent,
    TooltipComponent,
    TooltipDirective,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}