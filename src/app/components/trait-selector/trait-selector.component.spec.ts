import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitSelectorComponent } from './trait-selector.component';

describe('TraitSelectorComponent', () => {
  let component: TraitSelectorComponent;
  let fixture: ComponentFixture<TraitSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraitSelectorComponent]
    });
    fixture = TestBed.createComponent(TraitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
