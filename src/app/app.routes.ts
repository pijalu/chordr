import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';

export const AppRoutes = [
  { path: '', component: MainComponent },
  { path: 'about', component: AboutComponent },
];
