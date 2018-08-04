import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekBookComponent } from './week-book.component';

describe('WeekBookComponent', () => {
  let component: WeekBookComponent;
  let fixture: ComponentFixture<WeekBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
