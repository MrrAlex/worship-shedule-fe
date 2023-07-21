import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableRowComponent } from './timetable-row.component';

describe('TimetableRowComponent', () => {
  let component: TimetableRowComponent;
  let fixture: ComponentFixture<TimetableRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimetableRowComponent]
    });
    fixture = TestBed.createComponent(TimetableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
