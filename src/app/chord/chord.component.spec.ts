import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordComponent } from './chord.component';
import { ChordBoxComponent } from '../chord-box/chord-box.component';

describe('ChordComponent', () => {
  let component: ChordComponent;
  let fixture: ComponentFixture<ChordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordComponent, ChordBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
