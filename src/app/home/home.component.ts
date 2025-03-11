import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroSectionComponent} from '../hero-section/hero-section.component';
import {FeaturedEventsComponent} from '../featured-events/featured-events.component';
import {AnnouncementsComponent} from '../announcements/announcements.component';
import {AboutSummaryComponent} from '../about-summary/about-summary.component';
import {QuickLinksComponent} from '../quick-links/quick-links.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    FeaturedEventsComponent,
    AnnouncementsComponent,
    AboutSummaryComponent,
    QuickLinksComponent,
  ],
 templateUrl: './home.component.html',
 styleUrl: './home.component.scss'
})
export class HomeComponent { }
