import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';

import { AppRoutes} from './app.routes';
import { ChordInputComponent } from './chord-input/chord-input.component';
import { ChordComponent } from './chord/chord.component';

import { ChordBoxComponent } from './chord-box/chord-box.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ModeGenieComponent } from './mode-genie/mode-genie.component';
import { ChordLibraryComponent } from './chord-library/chord-library.component';
import { ModeExplorerComponent } from './mode-explorer/mode-explorer.component';

import { LocalStorageModule } from 'angular-2-local-storage';
import { DismissableAlertComponent } from './dismissable-alert/dismissable-alert.component';
import { TabPipe } from './tab.pipe';
import { CustomChordComponent } from './custom-chord/custom-chord.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    MainComponent,
    ChordInputComponent,
    ChordComponent,
    ChordBoxComponent,
    ModeGenieComponent,
    ChordLibraryComponent,
    ModeExplorerComponent,
    DismissableAlertComponent,
    TabPipe,
    CustomChordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    ModalModule.forRoot(),
    LocalStorageModule.withConfig({
            prefix: 'chordr-app',
            storageType: 'localStorage'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
