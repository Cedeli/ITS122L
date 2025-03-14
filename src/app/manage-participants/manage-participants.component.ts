import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import type { User } from '../models/user.model';

@Component({
  selector: 'app-manage-participants',
  templateUrl: './manage-participants.component.html',
  imports: [CommonModule],
  styleUrls: ['./manage-participants.component.scss'],
  standalone: true,
})
export class ManageParticipantsComponent implements OnInit {
  pendingParticipants: { first_name?: string; last_name?: string; email: string; uid: string }[] = [];
  approvedParticipants: { first_name?: string; last_name?: string; email: string; uid: string }[] = [];
  isLoading = true;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string }
  ) {}

  ngOnInit(): void {
    if (!this.data.eventId) {
      console.error('Event ID is not provided!');
      return;
    }

    this.fetchParticipantsAndUserData(this.data.eventId);
  }

  /**
   * Fetch event participants and their user details using EventService and AuthService
   */
  private fetchParticipantsAndUserData(eventId: string): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        const event = events.find((e) => e.id === eventId); // Find the matching event
        if (event) {
          const pendingUids: string[] = event.pendingParticipants || [];
          const approvedUids: string[] = event.approvedParticipants || [];

          this.resolveUserDetails(pendingUids).then((pendingUsers) => {
            this.pendingParticipants = pendingUsers;
          });
          this.resolveUserDetails(approvedUids).then((approvedUsers) => {
            this.approvedParticipants = approvedUsers;
          });

          this.isLoading = false;
        } else {
          console.warn(`Event with ID ${eventId} not found.`);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Failed to fetch event:', err);
        this.isLoading = false;
      },
    });
  }

  /**
   * Fetch detailed user data for a list of user IDs
   */
  private async resolveUserDetails(
    uids: string[]
  ): Promise<{ first_name?: string; last_name?: string; email: string; uid: string }[]> {
    const userDetailsPromises = uids.map((uid) =>
      this.authService.getUserData(uid).toPromise()
    );

    const userDetails = await Promise.all(userDetailsPromises); // Wait for all results
    return userDetails
      .filter((user): user is User => user !== null) // Filter out null users (if not found)
      .map((user) => ({
        uid: user.uid,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      }));
  }

  /**
   * Accept a pending participant and move them to the approved list
   */
  acceptParticipant(user: { uid: string; first_name?: string; last_name?: string; email: string }): void {
    this.pendingParticipants = this.pendingParticipants.filter((u) => u.uid !== user.uid);
    this.approvedParticipants.push(user);

    this.updateEventParticipants();
  }

  /**
   * Reject/remove a pending participant
   */
  rejectParticipant(user: { uid: string; first_name?: string; last_name?: string; email: string }): void {
    this.pendingParticipants = this.pendingParticipants.filter((u) => u.uid !== user.uid);

    this.updateEventParticipants();
  }

  /**
   * Remove an approved participant
   */
  removeParticipant(user: { uid: string; first_name?: string; last_name?: string; email: string }): void {
    this.approvedParticipants = this.approvedParticipants.filter((u) => u.uid !== user.uid);

    this.updateEventParticipants();
  }

  /**
   * Update Firestore when participants change
   */
  private updateEventParticipants(): void {
    this.eventService
      .updateEvent(this.data.eventId, {
        pendingParticipants: this.pendingParticipants.map((p) => p.uid),
        approvedParticipants: this.approvedParticipants.map((p) => p.uid),
      })
      .then(() => console.log('Participants updated in Firestore'))
      .catch((error) => console.error('Failed to update participants:', error));
  }
}
