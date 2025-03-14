import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { WebEvent } from '../models/web-event.model';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class EventDetailComponent implements OnInit {
  public event: WebEvent | null = null;
  public isLoading = true;
  public error: string | null = null;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private dateService: DateService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchEventDetails(id);
    } else {
      this.error = 'Event ID not found';
      this.isLoading = false;
    }
  }

  async fetchEventDetails(id: string) {
    try {
      this.isLoading = true;
      const eventRef = doc(this.firestore, 'events', id);
      const docSnap = await getDoc(eventRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        this.event = {
          id: docSnap.id,
          title: data['title'] || '',
          date: this.dateService.formatDate(data['date']),
          location: data['location'] || '',
          description: data['description'] || '',
          imageUrl: data['imageUrl'] || null,
          pendingParticipants: data['pendingParticipants'] || [],
          approvedParticipants: data['approvedParticipants'] || [],
          summary: data['summary'] || '',
        };
      } else {
        this.error = 'Event not found';
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      this.error = 'Error loading event';
    } finally {
      this.isLoading = false;
    }
  }
}
