import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { ModeGenieComponent} from './mode-genie/mode-genie.component';
import { ChordLibraryComponent } from './chord-library/chord-library.component';
import { ModeExplorerComponent } from './mode-explorer/mode-explorer.component';
import { ConfigComponent } from './config/config.component';

export const AppRoutes = [
  { path: '', component: MainComponent },
  { path: 'library', component: ChordLibraryComponent },
  { path: 'explorer', component: ModeExplorerComponent },
  { path: 'genie', component: ModeGenieComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'about', component: AboutComponent },
];
