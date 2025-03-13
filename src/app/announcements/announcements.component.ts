import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Firestore, collection, query, orderBy, getDocs, Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Announcement } from '../models/announcement.model';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  imports: [
    RouterLink,
    CommonModule
  ],
  styleUrls: ['./announcements.component.scss'],
  standalone: true
})
export class AnnouncementsComponent implements OnInit {
  public announcements: Announcement[] = [];
  public isLoading = true;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.fetchAnnouncements();
  }

  async fetchAnnouncements() {
    try {
      this.isLoading = true;
      const announcementsRef = collection(this.firestore, 'announcements');
      const q = query(
        announcementsRef,
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(q);
      this.announcements = querySnapshot.docs.map(doc => {
        const data = doc.data();

        let formattedDate = '';
        const dateField = data['date'];

        if (dateField instanceof Timestamp) {
          formattedDate = dateField.toDate().toLocaleDateString();
        } else if (dateField && typeof dateField.toDate === 'function') {
          formattedDate = dateField.toDate().toLocaleDateString();
        } else if (dateField instanceof Date) {
          formattedDate = dateField.toLocaleDateString();
        } else if (dateField) {
          formattedDate = String(dateField);
        }

        return {
          id: doc.id,
          title: data['title'] || '',
          date: formattedDate,
          summary: data['summary'] || '',
          description: data['description'] || '',
          important: Boolean(data['important']),
          author: data['author'] || '',
          imageUrl: data['imageUrl'] || null
        } as Announcement;
      });
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
