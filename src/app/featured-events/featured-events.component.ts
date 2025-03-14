import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';

export interface Event {
  id?: string;
  title: string;
  date: string; // ISO string format (e.g., "2023-11-10")
  description: string;
  imgsrc?: string;
}

@Component({
  selector: 'app-featured-events',
  templateUrl: './featured-events.component.html',
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./featured-events.component.scss']
})
export class FeaturedEventsComponent implements OnInit {
  featuredEvents: Event[] = [];
  isLoading: boolean = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchFeaturedEvents();
  }

  fetchFeaturedEvents(): void {
    const currentDate = new Date(); // Current date and time

    this.eventService.getEvents().subscribe({
      next: (events: Event[]) => {
        // Filter upcoming events and sort them by date
        this.featuredEvents = events
          .filter((event) => new Date(event.date) >= currentDate)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3); // Limit to the top 3 featured events
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching featured events:', err);
        this.isLoading = false;
      }
    });
  }
}
