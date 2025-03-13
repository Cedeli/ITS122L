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
  events$: Observable<any[]>;

  event: any = {
    id: '',
    title: '',
    date: '',
    location: '',
    description: '',
    imageUrl: ''
  };

  constructor(private firestore: Firestore) {
    const eventsCollection = collection(this.firestore, 'events');
    this.events$ = collectionData(eventsCollection, { idField: 'id' });
  }

  async saveEvent() {
    try {
      const eventsCollection = collection(this.firestore, 'events');

      if (this.event.id && this.event.id.trim() !== '') {
        const eventDoc = doc(this.firestore, `events/${this.event.id}`);
        const { id, ...eventData } = this.event;
        await updateDoc(eventDoc, eventData);
        console.log('Event updated successfully!');
      } else {
        const { id, ...newEventData } = this.event;
        const docRef = await addDoc(eventsCollection, newEventData);
        this.event.id = docRef.id;
        console.log('Event added successfully with id:', docRef.id);
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
      const eventDoc = doc(this.firestore, `events/${eventId}`);
      await deleteDoc(eventDoc);
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
