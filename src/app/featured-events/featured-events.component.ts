import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { EventService } from '../services/event.service';
import type { WebEvent } from '../models/web-event.model';

@Component({
  selector: 'app-featured-events',
  templateUrl: './featured-events.component.html',
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./featured-events.component.scss'],
  standalone: true,
})
export class FeaturedEventsComponent implements OnInit {
  featuredEvents: WebEvent[] = [];
  isLoading: boolean = true;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetchFeaturedEvents();
  }

  fetchFeaturedEvents(): void {
    const currentDate = new Date();
    this.eventService.getEvents().subscribe({
      next: (events: WebEvent[]) => {
        this.featuredEvents = events
          .filter((event) => new Date(event.date) >= currentDate)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching featured events:', err);
        this.isLoading = false;
      }
    });
  }
}
