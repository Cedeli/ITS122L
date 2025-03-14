import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, doc, deleteDoc, updateDoc, collectionData, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { ManageParticipantsComponent } from '../manage-participants/manage-participants.component';
import { MatDialog } from '@angular/material/dialog';
import { WebEvent} from '../models/web-event.model';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss'],
  imports: [CommonModule, FormsModule, MatDialogModule],
})
export class ManageEventComponent {
  events$: Observable<any[]>;

  event: WebEvent = {
    id: '',
    title: '',
    date: '',
    location: '',
    description: '',
    imageUrl: '',
    pendingParticipants: [],
    approvedParticipants: []
  };


  constructor(private firestore: Firestore, private dialog: MatDialog) {
    const eventsCollection = collection(this.firestore, 'events');
    this.events$ = collectionData(eventsCollection, {idField: 'id'});
  }

  async saveEvent() {
    try {
      const eventsCollection = collection(this.firestore, 'events');

      if (this.event.id && this.event.id.trim() !== '') {
        const eventDoc = doc(this.firestore, `events/${this.event.id}`);
        const docSnap = await getDoc(eventDoc);
                  // check if event exists
        if (!docSnap.exists()) {
          alert('Event does not exist. Leave the event ID blank to create new event.');
          this.event.id = '';
        } else {  // update if event exists
          const {id, ...eventData} = this.event;
          await updateDoc(eventDoc, eventData);
          alert('Event updated successfully!');
        }
      } else {
        const {id, ...newEventData} = this.event;
        const docRef = await addDoc(eventsCollection, newEventData);
        this.event.id = docRef.id;
        alert('Event added successfully with id:' + docRef.id);
      }

      this.resetForm();
    } catch (error) {
      alert('Error saving event:' + error);
    }
  }

  editEvent(eventItem: any) {
    this.event = {...eventItem};
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
      imageUrl: '',
      pendingParticipants: [],
      approvedParticipants: []
    };
  }

  manageParticipants(eventId: string) {
    const dialogRef = this.dialog.open(ManageParticipantsComponent, {
      width: '600px',
      data: {eventId},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }
}
