import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordLibraryComponent } from './chord-library.component';

describe('ChordLibraryComponent', () => {
  let component: ChordLibraryComponent;
  let fixture: ComponentFixture<ChordLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
