import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { ModeGenieComponent} from './mode-genie/mode-genie.component';
import { ChordLibraryComponent } from './chord-library/chord-library.component';
import { ModeExplorerComponent } from './mode-explorer/mode-explorer.component';

export const AppRoutes = [
  { path: '', component: MainComponent },
  { path: 'library', component: ChordLibraryComponent },
  { path: 'explorer', component: ModeExplorerComponent },
  { path: 'genie', component: ModeGenieComponent },
  { path: 'about', component: AboutComponent },
];
