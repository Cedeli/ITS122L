import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

// Components
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { MembersListComponent } from './members-list/members-list.component';

const routeConfig: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent },
  { path: 'announcements', component: AnnouncementsComponent, canActivate: [AuthGuard] },
  { path: 'events',  component: EventComponent, title: 'Events' },
  { path: 'contact',  component: ContactComponent, title: 'Contact' },
  { path: 'members', component: MembersListComponent, title: 'Members', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, title: 'Login', },
  { path: 'register', component: RegisterComponent, title: 'Register', },
  { path: '**', redirectTo: '/register' }
]

export default routeConfig;
