import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismissableAlertComponent } from './dismissable-alert.component';

import { LocalStorageModule } from 'angular-2-local-storage';


describe('DismissableAlertComponent', () => {
  let component: DismissableAlertComponent;
  let fixture: ComponentFixture<DismissableAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismissableAlertComponent ],
      imports: [
        LocalStorageModule.withConfig({
          prefix: 'chordr-app',
          storageType: 'sessionStorage'
      })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismissableAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
