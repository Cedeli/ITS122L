import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
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
  announcement = {
    title: '',
    date: null,
    type: '',
    description: '',
    summary: '',
    important: false
  };

  announcements$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  saveAnnouncement() {
    const announcementsCollection = collection(this.firestore, 'announcements');

    if ('id' in this.announcement && this.announcement['id']) {
      const announcementDocRef = doc(this.firestore, `announcements/${this.announcement['id']}`);
      const { id, ...announcementWithoutId } = this.announcement; // Remove id before updating

      updateDoc(announcementDocRef, announcementWithoutId)
        .then(() => {
          console.log('Announcement updated successfully!');
          this.resetForm();
        })
        .catch((error) => {
          console.error('Error updating announcement: ', error);
        });
    } else {
      addDoc(announcementsCollection, {
        title: this.announcement.title,
        date: this.announcement.date,
        type: this.announcement.type,
        description: this.announcement.description,
        summary: this.announcement.summary,
        important: this.announcement.important
      })
        .then(() => {
          console.log('Announcement created successfully!');
          this.resetForm();
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
      title: '',
      date: null,
      type: '',
      description: '',
      summary: '',
      important: false
    };
  }
}
