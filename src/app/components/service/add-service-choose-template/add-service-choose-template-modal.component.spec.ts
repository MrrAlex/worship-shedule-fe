import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceChooseTemplateModalComponent } from './add-service-choose-template-modal.component';

describe('AddServiceChooseTemplateComponent', () => {
  let component: AddServiceChooseTemplateModalComponent;
  let fixture: ComponentFixture<AddServiceChooseTemplateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddServiceChooseTemplateModalComponent]
    });
    fixture = TestBed.createComponent(AddServiceChooseTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
