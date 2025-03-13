import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, doc, deleteDoc, updateDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ManageEventComponent {
  events$: Observable<any[]>; // Observable for events list
  event = {
    title: '',
    date: '',
    location: '',
    description: '',
  };

  constructor(private firestore: Firestore) {
    const eventsCollection = collection(this.firestore, 'events');
    this.events$ = collectionData(eventsCollection, { idField: 'id' }); // Fetch events and include document ID
  }

  // Save (add or update) an event
  async saveEvent() {
    try {
      const eventsCollection = collection(this.firestore, 'events');

      if (this.event.id) {
        // If event ID exists, update the existing event
        const eventDoc = doc(this.firestore, `events/${this.event.id}`);
        await updateDoc(eventDoc, this.event);
        console.log('Event updated successfully!');
      } else {
        // If no ID, create a new event
        await addDoc(eventsCollection, this.event);
        console.log('Event added successfully!');
      }

      // Reset form after saving
      this.resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  // Edit an existing event
  editEvent(eventItem: any) {
    this.event = { ...eventItem }; // Prepopulate form with selected event data
  }

  // Delete an event
  async deleteEvent(eventId: string) {
    try {
      const eventDoc = doc(this.firestore, `events/${eventId}`);
      await deleteDoc(eventDoc);
      console.log('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }

  // Reset form for a new event
  resetForm() {
    this.event = {
      title: '',
      date: '',
      location: '',
      description: '',
    };
  }
}
