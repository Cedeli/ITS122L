import { Component } from '@angular/core';

// ROUTER
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent { }
