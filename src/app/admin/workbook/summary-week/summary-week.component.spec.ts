import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryWeekComponent } from './summary-week.component';

describe('SummaryWeekComponent', () => {
  let component: SummaryWeekComponent;
  let fixture: ComponentFixture<SummaryWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
