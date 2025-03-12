import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { RegisterComponent } from './register/register.component';

const routeConfig: Routes = [
  { path: '', component: HomeComponent, title: 'Home', },
  { path: 'home', component: HomeComponent, title: 'Home', },
  { path: 'about', component: AboutComponent },
  { path: 'announcements',  component: AnnouncementsComponent,  title: "Announcements", },
  { path: 'events',  component: HomeComponent,  title: 'Events', },
  { path: 'contact',  component: HomeComponent,  title: 'Contact', },
  { path: 'login', component: LoginComponent, title: 'Login', },
  { path: 'register', component: RegisterComponent, title: 'Register', },
]

export default routeConfig;
