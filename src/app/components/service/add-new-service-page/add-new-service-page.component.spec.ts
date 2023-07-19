import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewServicePageComponent } from './add-new-service-page.component';

describe('AddNewServicePageComponent', () => {
  let component: AddNewServicePageComponent;
  let fixture: ComponentFixture<AddNewServicePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewServicePageComponent]
    });
    fixture = TestBed.createComponent(AddNewServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
