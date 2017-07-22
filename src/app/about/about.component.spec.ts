import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';


import { LocalStorageModule } from 'angular-2-local-storage';
import { DismissableAlertComponent } from '../dismissable-alert/dismissable-alert.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          LocalStorageModule.withConfig({
            prefix: 'chordr-app',
            storageType: 'sessionStorage'
        })
      ],
      declarations: [ AboutComponent, DismissableAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
