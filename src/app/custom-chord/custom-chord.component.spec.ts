import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChordComponent } from './custom-chord.component';

describe('CustomChordComponent', () => {
  let component: CustomChordComponent;
  let fixture: ComponentFixture<CustomChordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomChordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomChordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
