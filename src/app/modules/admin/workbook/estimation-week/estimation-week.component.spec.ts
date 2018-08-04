import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationWeekComponent } from './estimation-week.component';

describe('EstimationWeekComponent', () => {
  let component: EstimationWeekComponent;
  let fixture: ComponentFixture<EstimationWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimationWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
