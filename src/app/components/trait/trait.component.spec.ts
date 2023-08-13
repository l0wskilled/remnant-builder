import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitComponent } from './trait.component';

describe('TraitComponent', () => {
  let component: TraitComponent;
  let fixture: ComponentFixture<TraitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraitComponent]
    });
    fixture = TestBed.createComponent(TraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
