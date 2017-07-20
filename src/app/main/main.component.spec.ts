import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { ModalModule } from 'ngx-bootstrap';
import { ChordComponent } from '../chord/chord.component';

import { ChordBoxComponent } from '../chord-box/chord-box.component';
import { ChordInputComponent } from '../chord-input/chord-input.component'


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordInputComponent, ChordComponent, ChordBoxComponent, MainComponent ],
      imports: [
        FormsModule,
        ModalModule.forRoot()
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
