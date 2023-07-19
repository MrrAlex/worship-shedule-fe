import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTemplateListComponent } from './service-template-list.component';

describe('ServiceTemplateListComponent', () => {
  let component: ServiceTemplateListComponent;
  let fixture: ComponentFixture<ServiceTemplateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceTemplateListComponent]
    });
    fixture = TestBed.createComponent(ServiceTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
