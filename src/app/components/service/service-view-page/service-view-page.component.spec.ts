import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceViewPageComponent } from './service-view-page.component';

describe('ServiceViewPageComponent', () => {
  let component: ServiceViewPageComponent;
  let fixture: ComponentFixture<ServiceViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceViewPageComponent]
    });
    fixture = TestBed.createComponent(ServiceViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
