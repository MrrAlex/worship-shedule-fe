import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInstrumentConfigComponent } from './service-instrument-config.component';

describe('ServiceInstrumentConfigComponent', () => {
  let component: ServiceInstrumentConfigComponent;
  let fixture: ComponentFixture<ServiceInstrumentConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceInstrumentConfigComponent]
    });
    fixture = TestBed.createComponent(ServiceInstrumentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
