import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import type { WebEvent } from '../models/web-event.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event',
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  standalone: true,
})
export class EventComponent implements OnInit {
  public upcomingEvents: WebEvent[] = [];
  public previousEvents: WebEvent[] = [];
  public isLoading = true;
  public currentUser: string = '';

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

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

  ngOnInit(): void {
    this.getCurrentUser()
    this.fetchEvents();
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user?.uid) {
          this.currentUser = user.uid;
        } else {
          console.warn('Not Logged In');
        }
      },
      error: (err) => {
        console.error('Failed to load user information:', err);
      }
    });
  }


  fetchEvents() {
    const currentDate = new Date();
    this.isLoading = true;

    this.eventService.getEvents().subscribe({
      next: (events: WebEvent[]) => {
        this.isLoading = false;

        // Filter and sort as upcoming and previous events
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

  // Add the current user as a pending participant
  onSubmit(event: WebEvent) {
    if (!this.currentUser) {
      window.location.href = '/login';
      return;
    }

    // Ensure the `pendingParticipants` field exists
    if (!event.pendingParticipants) {
      event.pendingParticipants = [];
    }

    // Check if the current user ID is already in `pendingParticipants` or `approvedParticipants`
    if (event.pendingParticipants.includes(this.currentUser)) {
      alert('User is already a pending participant for this event.');
      return;
    }

    if (event.approvedParticipants && event.approvedParticipants.includes(this.currentUser)) {
      alert('User is already approved to join this event.');
      return;
    }

    // Add the current user ID to `pendingParticipants`
    event.pendingParticipants.push(this.currentUser);

    // Call the service to update the event data in the Firestore
    this.eventService.updateEvent(event.id, { pendingParticipants: event.pendingParticipants })
      .then(() => {
        alert('User successfully added to the event as a pending participant.');
      })
      .catch((error) => {
        console.error('Failed to update the event with the user:', error);
      });
  }

  checkImageUrl(imgsrc: string | undefined): string {
    // If the imgsrc is empty or undefined, use a default image
    return imgsrc && imgsrc.trim()
      ? imgsrc
      : 'BRM Logo.jpg';
  }
}
