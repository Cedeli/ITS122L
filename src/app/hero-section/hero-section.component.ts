import { Component } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent { }
