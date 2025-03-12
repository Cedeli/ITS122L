// app.component.ts
import { Component } from '@angular/core';
import {Router, NavigationEnd, RouterOutlet} from '@angular/router';
import { filter } from 'rxjs/operators';
import {NavbarComponent} from './navbar/navbar.component';
import {NgIf} from '@angular/common';

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
  currentUrl = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
      });
  }

  shouldShowNavbar(): boolean {
    return !this.currentUrl.startsWith('/login') && !this.currentUrl.startsWith('/register');
  }
}
