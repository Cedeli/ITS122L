import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';

export interface Event {
  title: string;
  date: string; // ISO string format (e.g., "2023-11-10")
  description: string;
  imgsrc?: string;
}

@Component({
  selector: 'app-event',
  imports: [
    CommonModule,
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  public upcomingEvents: Event[] = [];
  public previousEvents: Event[] = [];
  public isLoading = true;

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    const currentDate = new Date(); // Current date and time
    this.isLoading = true;
    console.log(currentDate);

    this.eventService.getEvents().subscribe({
      next: (events: Event[]) => {
        this.isLoading = false;

        // Log each event's date for debugging
        events.forEach((event) => {
          console.log(`Event Date: ${event.date}, Normalized Event Date: ${new Date(event.date).toISOString()}`);
        });

        // Separate events into upcoming and previous, and sort


        this.upcomingEvents = events
          .filter((event) => new Date(event.date) >= currentDate)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        this.previousEvents = events
          .filter((event) => new Date(event.date) < currentDate)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.isLoading = false;
      }
    });
  }
}
