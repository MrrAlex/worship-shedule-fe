import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceTemplateModalComponent } from './add-service-template-modal.component';

describe('AddServiceTemplateModalComponent', () => {
  let component: AddServiceTemplateModalComponent;
  let fixture: ComponentFixture<AddServiceTemplateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddServiceTemplateModalComponent]
    });
    fixture = TestBed.createComponent(AddServiceTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
