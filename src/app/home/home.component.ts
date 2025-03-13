import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { FeaturedEventsComponent } from '../featured-events/featured-events.component';
import { AboutSummaryComponent } from '../about-summary/about-summary.component';
import { QuickLinksComponent } from '../quick-links/quick-links.component';
import { FeaturedAnnouncementsComponent } from '../featured-announcements/featured-announcements.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    FeaturedEventsComponent,
    AboutSummaryComponent,
    QuickLinksComponent,
    FeaturedAnnouncementsComponent,
  ],
 templateUrl: './home.component.html',
 styleUrl: './home.component.scss'
})
export class HomeComponent { }
