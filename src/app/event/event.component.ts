import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  async fetchEvents() {
    const currentDate = new Date(); // Current date and time
    try {
      this.isLoading = true;

      const eventsCollection = collection(this.firestore, 'events');
      const events$: Observable<Event[]> = collectionData(eventsCollection, {
        idField: 'id',
      }) as Observable<Event[]>;

      events$.subscribe((events) => {
        this.isLoading = false;

        this.upcomingEvents = events
          .filter((event) => new Date(event.date) >= currentDate)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        this.previousEvents = events
          .filter((event) => new Date(event.date) < currentDate)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
    } catch (e) {
      console.error('Error fetching events:', e);
      this.isLoading = false;
    }
  }
}
