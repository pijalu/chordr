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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    MainComponent,
    ChordInputComponent,
    ChordComponent,
    ChordBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
