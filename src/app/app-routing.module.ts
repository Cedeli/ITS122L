import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




export const routes: Routes = [
  {path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  {path: 'announcements', loadComponent: () => import('./announcements/announcements.component').then(m => m.AnnouncementsComponent)},
  {path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)},
  {path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
