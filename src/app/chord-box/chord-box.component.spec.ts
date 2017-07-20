import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordBoxComponent } from './chord-box.component';

describe('ChordBoxComponent', () => {
  let component: ChordBoxComponent;
  let fixture: ComponentFixture<ChordBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
