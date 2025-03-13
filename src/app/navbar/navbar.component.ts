import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    AsyncPipe
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: Observable<boolean> | undefined;
  isMember: Observable<boolean> | undefined;
  isAdmin: Observable<boolean> | undefined;

  constructor(
    public nav: NavbarService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.isMember = this.auth.getUserRole().pipe(
      map(role => role === 'member' || role === 'admin')
    );
    this.isAdmin = this.auth.getUserRole().pipe(
      map(role => role === 'admin')
    );
  }
}
