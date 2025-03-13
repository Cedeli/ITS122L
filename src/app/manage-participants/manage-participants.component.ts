import {Component, Inject, Input, OnInit} from '@angular/core';
import {EventService} from '../services/event.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-participants',
  imports: [],
  templateUrl: './manage-participants.component.html',
  styleUrl: './manage-participants.component.scss'
})
export class ManageParticipantsComponent implements OnInit{
  pendingParticipants: { id: string; name: string; email: string }[] = [];
  approvedParticipants: { id: string; name: string; email: string }[] = [];

  constructor(
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string } // Injecting eventId from dialog
  ) {}


  ngOnInit() {
    if (!this.data.eventId) {
      console.error('No Event ID provided');
      return;
    }

    // Fetch participants for the given eventId
    this.fetchParticipants(this.data.eventId);
  }


  fetchParticipants(eventId: string) {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        const event = events.find((e) => e.id === eventId);
        if (event) {
          this.pendingParticipants = event.pendingParticipants ?? [];
          this.approvedParticipants = event.approvedParticipants ?? [];
        } else {
          console.warn('No event found with the given ID:', eventId);
        }
      },
      error: (err) => {
        console.error('Error fetching participants:', err);
      },
    });
  }


  // Accept participant
  acceptParticipant(user: { id: string; name: string; email: string }) {
    this.pendingParticipants = this.pendingParticipants.filter(
      (participant) => participant.id !== user.id
    );
    this.approvedParticipants.push(user);

    this.updateParticipants();
    console.log('Accepted participant:', user);
  }

  // Reject participant
  rejectParticipant(user: { id: string; name: string; email: string }) {
    this.pendingParticipants = this.pendingParticipants.filter(
      (participant) => participant.id !== user.id
    );

    this.updateParticipants();
    console.log('Rejected participant:', user);
  }

  // Remove approved participant
  removeParticipant(user: { id: string; name: string; email: string }) {
    this.approvedParticipants = this.approvedParticipants.filter(
      (participant) => participant.id !== user.id
    );

    this.updateParticipants();
    console.log('Removed approved participant:', user);
  }

  // Update Firestore participants using EventService
  private updateParticipants() {
    this.eventService.updateEvent(this.data.eventId, {
      pendingParticipants: this.pendingParticipants,
      approvedParticipants: this.approvedParticipants,
    }).then(() => {
      console.log('Firestore participants updated successfully.');
    }).catch((error) => {
      console.error('Error updating participants in Firestore:', error);
    });
  }
}
