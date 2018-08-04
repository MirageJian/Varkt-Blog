import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationComponent } from './autorisation.component';

describe('AutorisationComponent', () => {
  let component: AutorisationComponent;
  let fixture: ComponentFixture<AutorisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
