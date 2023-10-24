import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRehearsalModalComponent } from './add-rehearsal-modal.component';

describe('AddRehearsalModalComponent', () => {
  let component: AddRehearsalModalComponent;
  let fixture: ComponentFixture<AddRehearsalModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRehearsalModalComponent]
    });
    fixture = TestBed.createComponent(AddRehearsalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
