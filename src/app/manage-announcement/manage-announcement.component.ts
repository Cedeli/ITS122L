import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-announcement',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './manage-announcement.component.html',
  styleUrls: ['./manage-announcement.component.scss']
})
export class ManageAnnouncementComponent {
  number = 0;
  announcement = {
    id: this.number,
    title: '',
    date: null,
    type: '',
    description: '',
    summary: '',
    important: false
  };

  public typeList = [
    "Event page Information", "About Page Information", "Contact Page Information"
  ];

  announcements$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  saveAnnouncement() {
    this.announcement.id = this.number;
    const announcementsCollection = collection(this.firestore, 'announcements');
    if (this.announcement.id) {
      // Update an existing announcement
      const announcementDocRef = doc(this.firestore, `announcements/${this.announcement.id}`);
      updateDoc(announcementDocRef, this.announcement)
        .then(() => {
          console.log('Announcement updated successfully!');
          this.resetForm(); // Reset the form
        })
        .catch((error) => {
          console.error('Error updating announcement: ', error);
        });
    } else {
      // Create a new announcement
      const announcementsCollection = collection(this.firestore, 'announcements');
      addDoc(announcementsCollection, this.announcement)
        .then(() => {
          console.log('Announcement created successfully!');
          this.resetForm(); // Reset the form
        })
        .catch((error) => {
          console.error('Error creating announcement: ', error);
        });
    }
  }

    loadAnnouncements() {
      const announcementsCollection = collection(this.firestore, 'announcements');
      this.announcements$ = collectionData(announcementsCollection, { idField: 'id' });
    }

    editAnnouncement(announcement: any) {
      this.announcement = { ...announcement };
    }

    deleteAnnouncement(announcementId: string) {
    const announcementDocRef = doc(this.firestore, `announcements/${announcementId}`);
    deleteDoc(announcementDocRef)
      .then(() => {
        console.log('Announcement deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting announcement: ', error);
      });
  }

  resetForm() {
    this.announcement = {
      id: this.number,
      title: '',
      date: null,
      type: '',
      description: '',
      summary: '',
      important: false
    };
  }
}
