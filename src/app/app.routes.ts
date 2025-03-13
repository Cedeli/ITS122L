import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ContactComponent } from './contact/contact.component';
import { MembersListComponent } from './members-list/members-list.component';
import { ManageAnnouncementComponent } from './manage-announcement/manage-announcement.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { ManageInformationComponent } from './manage-information/manage-information.component';
import { ManageSubmissionComponent } from './manage-submission/manage-submission.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AnnouncementDetailComponent } from './announcement-detail/announcement-detail.component';

const routeConfig: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent },
  { path: 'announcements', component: AnnouncementsComponent, title: 'Announcements' },
  { path: 'announcements/:id', component: AnnouncementDetailComponent, title: 'AnnouncementDetail' },
  { path: 'events',  component: EventComponent,  title: 'Events' },
  { path: 'contact',  component: ContactComponent,  title: 'Contact' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'account-details', component: AccountDetailsComponent, title: 'Account Details', canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
    children: [
      { path: 'announcement', component: ManageAnnouncementComponent, title: 'Manage Announcement' },
      { path: 'event', component: ManageEventComponent, title: 'Manage Event' },
      { path: 'information', component: ManageInformationComponent, title: 'Manage Information' },
      { path: 'submission', component: ManageSubmissionComponent, title: 'Manage Submission' },
      { path: 'user', component: ManageUserComponent, title: 'Manage User' }
    ]
  },
  { path: '**', redirectTo: '/register' }
];

export default routeConfig;
