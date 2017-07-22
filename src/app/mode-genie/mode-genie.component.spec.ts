import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { LocalStorageModule } from 'angular-2-local-storage';

import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ModeGenieComponent } from './mode-genie.component';

import { CustomChordComponent } from '../custom-chord/custom-chord.component';
import { ChordComponent } from '../chord/chord.component';
import { ChordBoxComponent } from '../chord-box/chord-box.component';
import { ChordInputComponent } from '../chord-input/chord-input.component';
import { DismissableAlertComponent } from '../dismissable-alert/dismissable-alert.component';
import { TabPipe } from '../tab.pipe';
import { TabToNotesPipe } from '../tab-to-notes.pipe';

describe('ModeGenieComponent', () => {
  let component: ModeGenieComponent;
  let fixture: ComponentFixture<ModeGenieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          TabPipe,
          TabToNotesPipe,
          DismissableAlertComponent,
          CustomChordComponent,
          ChordInputComponent,
          ChordBoxComponent,
          ChordComponent,
          ModeGenieComponent ],
      imports: [
        FormsModule,
        ModalModule.forRoot(),
        LocalStorageModule.withConfig({
          prefix: 'chordr-app',
          storageType: 'sessionStorage'
        })]
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
