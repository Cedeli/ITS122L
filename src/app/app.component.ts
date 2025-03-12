import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './services/navbar.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NavbarComponent,
    RouterOutlet,
    NgIf
  ]
})
export class AppComponent {
  isAdminPage: boolean = false;

  constructor(private router: Router, public nav: NavbarService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (!event.url.startsWith('/login') && !event.url.startsWith('/register')) {
        this.nav.show();
      }
      this.isAdminPage = event.url.startsWith('/admin');
    });
  }
}
