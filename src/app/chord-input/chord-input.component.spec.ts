import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordInputComponent } from './chord-input.component';

describe('ChordInputComponent', () => {
  let component: ChordInputComponent;
  let fixture: ComponentFixture<ChordInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
