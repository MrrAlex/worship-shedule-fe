import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewServiceFormComponent } from './add-new-service-form.component';

describe('AddNewServiceFormComponent', () => {
  let component: AddNewServiceFormComponent;
  let fixture: ComponentFixture<AddNewServiceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewServiceFormComponent]
    });
    fixture = TestBed.createComponent(AddNewServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
