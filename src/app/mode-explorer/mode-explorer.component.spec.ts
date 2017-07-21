import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeExplorerComponent } from './mode-explorer.component';

describe('ModeExplorerComponent', () => {
  let component: ModeExplorerComponent;
  let fixture: ComponentFixture<ModeExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
