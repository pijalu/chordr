import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordExplorerComponent } from './chord-explorer.component';

describe('ChordExplorerComponent', () => {
  let component: ChordExplorerComponent;
  let fixture: ComponentFixture<ChordExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
