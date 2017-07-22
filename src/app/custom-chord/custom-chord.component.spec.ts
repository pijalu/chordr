import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { LocalStorageModule } from 'angular-2-local-storage';

import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CustomChordComponent } from './custom-chord.component';
import { ChordComponent } from '../chord/chord.component';
import { ChordBoxComponent } from '../chord-box/chord-box.component';
import { ChordInputComponent } from '../chord-input/chord-input.component';

import { DismissableAlertComponent } from '../dismissable-alert/dismissable-alert.component';
import { TabPipe } from '../tab.pipe';
import { TabToNotesPipe } from '../tab-to-notes.pipe';

describe('CustomChordComponent', () => {
  let component: CustomChordComponent;
  let fixture: ComponentFixture<CustomChordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          TabPipe,
          TabToNotesPipe,
          DismissableAlertComponent,
          ChordInputComponent,
          ChordBoxComponent,
          ChordComponent,
          CustomChordComponent],
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
    fixture = TestBed.createComponent(CustomChordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
