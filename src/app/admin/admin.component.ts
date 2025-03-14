import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
})
export class AdminComponent {

}
