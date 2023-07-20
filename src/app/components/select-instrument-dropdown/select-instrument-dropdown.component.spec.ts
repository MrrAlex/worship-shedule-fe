import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInstrumentDropdownComponent } from './select-instrument-dropdown.component';

describe('SelectInstrumentDropdownComponent', () => {
  let component: SelectInstrumentDropdownComponent;
  let fixture: ComponentFixture<SelectInstrumentDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectInstrumentDropdownComponent]
    });
    fixture = TestBed.createComponent(SelectInstrumentDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
