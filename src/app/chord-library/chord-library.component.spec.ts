import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { LocalStorageModule } from 'angular-2-local-storage';

import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ChordComponent } from '../chord/chord.component';
import { ChordBoxComponent } from '../chord-box/chord-box.component';
import { ChordLibraryComponent } from './chord-library.component';
import { DismissableAlertComponent } from '../dismissable-alert/dismissable-alert.component';

describe('ChordLibraryComponent', () => {
  let component: ChordLibraryComponent;
  let fixture: ComponentFixture<ChordLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismissableAlertComponent, ChordBoxComponent, ChordComponent, ChordLibraryComponent ],
      imports: [
          FormsModule,
          ModalModule.forRoot(),
          LocalStorageModule.withConfig({
            prefix: 'chordr-app',
            storageType: 'sessionStorage'
        })
      ],
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
