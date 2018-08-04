import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssortmentComponent } from './assortment.component';

describe('AssortmentComponent', () => {
  let component: AssortmentComponent;
  let fixture: ComponentFixture<AssortmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssortmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssortmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
