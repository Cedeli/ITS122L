import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ManageEventComponent {
  events$: Observable<any[]>;
  event: any = {
    id: '',
    title: '',
    date: '',
    location: '',
    description: '',
    imageUrl: ''
  };

  constructor(private eventService: EventService) {
    this.events$ = this.eventService.getEvents();
  }

  async saveEvent() {
    try {
      if (this.event.id && this.event.id.trim() !== '') {
        await this.eventService.updateEvent(this.event.id, this.event);
        console.log('Event updated successfully!');
      } else {
        await this.eventService.createEvent(this.event);
        console.log('Event added successfully!');
      }
      this.resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  editEvent(eventItem: any) {
    this.event = { ...eventItem };
  }

  async deleteEvent(eventId: string) {
    try {
      await this.eventService.deleteEvent(eventId);
      console.log('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }

  resetForm() {
    this.event = {
      id: '',
      title: '',
      date: '',
      location: '',
      description: '',
      imageUrl: ''
    };
  }
}
