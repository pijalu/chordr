import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeGenieComponent } from './mode-genie.component';

describe('ModeGenieComponent', () => {
  let component: ModeGenieComponent;
  let fixture: ComponentFixture<ModeGenieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeGenieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeGenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
