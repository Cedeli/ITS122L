import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public nav: NavbarService) {
  }
}
