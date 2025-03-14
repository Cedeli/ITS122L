import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-manage-participants',
  templateUrl: './manage-participants.component.html',
  imports: [CommonModule],
  styleUrls: ['./manage-participants.component.scss'],
})
export class ManageParticipantsComponent implements OnInit {
  pendingParticipants: { first_name?: string; last_name?: string; email: string; uid: string }[] = [];
  approvedParticipants: { first_name?: string; last_name?: string; email: string; uid: string }[] = [];
  isLoading = true;

  constructor(
    private eventService: EventService, // Inject EventService
    private authService: AuthService,    // Inject AuthService
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string } // Inject data (eventId from dialog)
  ) {}

  ngOnInit(): void {
    // Check if eventId passed in data
    if (!this.data.eventId) {
      console.error('Event ID is not provided!');
      return;
    }

    // Fetch participants with additional user info
    this.fetchParticipantsAndUserData(this.data.eventId);
  }

  /**
   * Fetch event participants and their user details using EventService and AuthService
   */
  private fetchParticipantsAndUserData(eventId: string): void {
    // Get event with specified eventId
    this.eventService.getEvents().subscribe({
      next: (events) => {
        const event = events.find((e) => e.id === eventId); // Find the matching event
        if (event) {
          const pendingUids: string[] = event.pendingParticipants || [];
          const approvedUids: string[] = event.approvedParticipants || [];

          // Fetch user data for pending and approved participants
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
    // Use Promise.all to fetch details for multiple users concurrently
    const userDetailsPromises = uids.map((uid) =>
      this.authService.getUserData(uid).toPromise() // Convert Observable to Promise
    );

    const userDetails = await Promise.all(userDetailsPromises); // Wait for all results
    return userDetails
      .filter((user): user is User => user !== null) // Filter out null users (if not found)
      .map((user) => ({
        uid: user.uid,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      })); // Map user details
  }

  /**
   * Accept a pending participant and move them to the approved list
   */
  acceptParticipant(user: { uid: string; first_name?: string; last_name?: string; email: string }): void {
    this.pendingParticipants = this.pendingParticipants.filter((u) => u.uid !== user.uid);
    this.approvedParticipants.push(user);

    // Reflect changes in Firestore
    this.updateEventParticipants();
  }

  /**
   * Reject/remove a pending participant
   */
  rejectParticipant(user: { uid: string; first_name?: string; last_name?: string; email: string }): void {
    this.pendingParticipants = this.pendingParticipants.filter((u) => u.uid !== user.uid);

    // Reflect changes in Firestore
    this.updateEventParticipants();
  }

  /**
   * Remove an approved participant
   */
  removeParticipant(user: { uid: string; first_name?: string; last_name?: string; email: string }): void {
    this.approvedParticipants = this.approvedParticipants.filter((u) => u.uid !== user.uid);

    // Reflect changes in Firestore
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
