import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, doc, deleteDoc, updateDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ManageParticipantsComponent } from '../manage-participants/manage-participants.component';
import type { WebEvent } from '../models/web-event.model';
import { AuthService } from '../services/auth.service';
import type { User } from '../models/user.model';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss'],
  imports: [CommonModule, FormsModule, MatDialogModule],
})
export class ManageEventComponent implements OnInit {
  events$: Observable<any[]> | undefined;
  event: WebEvent = {
    id: '',
    title: '',
    date: '',
    location: '',
    description: '',
    imageUrl: '',
    pendingParticipants: [],
    approvedParticipants: [],
    author: '',
    summary: '',
  };

  currentUser: User | null = null;

  constructor(private firestore: Firestore, private dialog: MatDialog, private authService: AuthService) {
    this.loadEvents();
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadEvents() {
    const eventsCollection = collection(this.firestore, 'events');
    this.events$ = collectionData(eventsCollection, { idField: 'id' });
  }

  loadCurrentUser() {
    this.authService.getCombinedUserData().subscribe(user => {
      this.currentUser = user;
      if (this.event.id && !this.event.author) {
        this.event.author = this.currentUser ? `${this.currentUser.first_name} ${this.currentUser.last_name}` : 'Anonymous';
      }
    });
  }

  async saveEvent() {
    const eventsCollection = collection(this.firestore, 'events');

    this.event.author = this.currentUser
      ? `${this.currentUser.first_name} ${this.currentUser.last_name}`
      : 'Anonymous';

    let eventData: any = {
      title: this.event.title,
      date: this.event.date,
      location: this.event.location,
      description: this.event.description,
      author: this.event.author,
      imageUrl: this.event.imageUrl || null,
      pendingParticipants: this.event.pendingParticipants || [],
      approvedParticipants: this.event.approvedParticipants || [],
      summary: this.event.summary,
    };


    try {
      if (this.event.id && this.event.id.trim() !== '') {
        const eventDoc = doc(this.firestore, `events/${this.event.id}`);
        const { id, ...eventDataWithoutId } = this.event;
        await updateDoc(eventDoc, eventDataWithoutId);
        alert('Event updated successfully!');
      } else {
        const docRef = await addDoc(eventsCollection, eventData);
        this.event.id = docRef.id;
        alert('Event added successfully with id:' + docRef.id);
      }
      this.resetForm();
      this.loadEvents();
    } catch (error) {
      alert('Error saving event:' + error);
    }
  }

  editEvent(eventItem: any) {
    this.event = JSON.parse(JSON.stringify(eventItem));
    if (!this.event.author) {
      this.event.author = this.currentUser
        ? `${this.currentUser.first_name} ${this.currentUser.last_name}`
        : 'Anonymous';
    }
  }

  async deleteEvent(eventId: string) {
    const eventDoc = doc(this.firestore, `events/${eventId}`);
    try {
      await deleteDoc(eventDoc);
      console.log('Event deleted successfully!');
      this.loadEvents();
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
      approvedParticipants: [],
      author: '',
      summary:'',
    };
  }

  manageParticipants(eventId: string) {
    const dialogRef = this.dialog.open(ManageParticipantsComponent, {
      width: '600px',
      data: { eventId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog result:', result);
        this.loadEvents();
      }
    });
  }
}
