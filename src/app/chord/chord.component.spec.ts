import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordComponent } from './chord.component';
import { ChordBoxComponent } from '../chord-box/chord-box.component';

import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('ChordComponent', () => {
  let component: ChordComponent;
  let fixture: ComponentFixture<ChordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChordComponent, ChordBoxComponent],
      imports: [FormsModule, ModalModule.forRoot()]
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
