import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentAddModalComponent } from './instrument-add-modal.component';

describe('InstrumentAddFormComponent', () => {
  let component: InstrumentAddModalComponent;
  let fixture: ComponentFixture<InstrumentAddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentAddModalComponent]
    });
    fixture = TestBed.createComponent(InstrumentAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
