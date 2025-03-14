import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import type { User } from '../models/user.model';

@Component({
  selector: 'app-manage-announcement',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './manage-announcement.component.html',
  styleUrls: ['./manage-announcement.component.scss']
})
export class ManageAnnouncementComponent implements OnInit {
  announcement: {
    id: string;
    title: string;
    date: string | null;
    description: string;
    summary: string;
    important: boolean;
    author: string;
    imageUrl: string;
  } = {
    id: '',
    title: '',
    date: null,
    description: '',
    summary: '',
    important: false,
    author: '',
    imageUrl: ''
  };
  announcements$: Observable<any[]> | undefined;
  currentUser: User | null = null;

  constructor(private firestore: Firestore, private authService: AuthService) {} // Inject AuthService

  ngOnInit(): void {
    this.loadAnnouncements();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.authService.getCombinedUserData().subscribe(user => {
      this.currentUser = user;
      if (this.announcement.id && !this.announcement.author) {
        this.announcement.author = this.currentUser ? `${this.currentUser.first_name} ${this.currentUser.last_name}`: 'Anonymous';
      }
    });
  }

  saveAnnouncement() {
    const announcementsCollection = collection(this.firestore, 'announcements');

    this.announcement.author = this.currentUser
      ? `${this.currentUser.first_name} ${this.currentUser.last_name}`
      : 'Anonymous';

    let announcementData: any = {
      title: this.announcement.title,
      date: this.announcement.date,
      description: this.announcement.description,
      summary: this.announcement.summary,
      important: this.announcement.important,
      author: this.announcement.author,
      imageUrl: this.announcement.imageUrl || null,
    };

    if (this.announcement.id && this.announcement.id.trim() !== '') {
      const announcementDocRef = doc(this.firestore, `announcements/${this.announcement.id}`);
      const { id, ...announcementWithoutId } = this.announcement;
      updateDoc(announcementDocRef, announcementWithoutId)
        .then(() => {
          console.log('Announcement updated successfully!');
          this.resetForm();
        })
        .catch((error) => {
          console.error('Error updating announcement: ', error);
        });
    } else {
      addDoc(announcementsCollection, announcementData)
        .then((docRef) => {
          console.log('Announcement created successfully with ID:', docRef.id);
          this.resetForm();
          this.announcement.id = docRef.id;
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
    const dateString = announcement.date instanceof Date
      ? announcement.date.toISOString().split('T')[0]
      : announcement.date;
    this.announcement = { ...announcement, date: dateString };

    if (!this.announcement.author) {
      this.announcement.author = this.currentUser ? `${this.currentUser.first_name} ${this.currentUser.last_name}`: 'Anonymous';
    }
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
      id: '',
      title: '',
      date: null,
      description: '',
      summary: '',
      important: false,
      author: '',
      imageUrl: ''
    };
  }
}
