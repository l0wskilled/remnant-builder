import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitListComponent } from './trait-list.component';

describe('TraitListComponent', () => {
  let component: TraitListComponent;
  let fixture: ComponentFixture<TraitListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraitListComponent]
    });
    fixture = TestBed.createComponent(TraitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
