import {HomeComponent} from './home/home.component';
import {Routes} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {AnnouncementsComponent} from './announcements/announcements.component';
import { PoliciesFaqComponent } from './policies-faq/policies-faq.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent,
    title: "Announcements",
  },
  {
    path: 'events',
    component: HomeComponent,
    title: 'Events',
  },
  {
    path: 'contact',
    component: HomeComponent,
    title: 'Contact',
  },
  {
    path: 'info',
    component: PoliciesFaqComponent,
    title: 'Policies * FAQ'
  }
]

export default routeConfig;
