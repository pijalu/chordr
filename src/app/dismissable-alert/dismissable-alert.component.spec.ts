import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismissableAlertComponent } from './dismissable-alert.component';

describe('DismissableAlertComponent', () => {
  let component: DismissableAlertComponent;
  let fixture: ComponentFixture<DismissableAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismissableAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismissableAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
