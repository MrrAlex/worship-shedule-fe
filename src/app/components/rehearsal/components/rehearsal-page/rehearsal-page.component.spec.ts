import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalPageComponent } from './rehearsal-page.component';

describe('RehearsalPageComponent', () => {
  let component: RehearsalPageComponent;
  let fixture: ComponentFixture<RehearsalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RehearsalPageComponent]
    });
    fixture = TestBed.createComponent(RehearsalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
