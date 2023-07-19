import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentsListComponent } from './instruments-list.component';

describe('InstrumentsListComponent', () => {
  let component: InstrumentsListComponent;
  let fixture: ComponentFixture<InstrumentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentsListComponent]
    });
    fixture = TestBed.createComponent(InstrumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
