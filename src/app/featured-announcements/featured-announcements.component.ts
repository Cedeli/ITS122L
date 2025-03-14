import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Firestore, collection, query, orderBy, limit, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import type { Announcement } from '../models/announcement.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-featured-announcements',
  templateUrl: './featured-announcements.component.html',
  imports: [
    RouterLink,
    CommonModule
  ],
  styleUrls: ['./featured-announcements.component.scss'],
  standalone: true
})
export class FeaturedAnnouncementsComponent implements OnInit {
  public recentAnnouncements: Announcement[] = [];

  constructor(private firestore: Firestore) { }

  ngOnInit() {
    this.fetchRecentAnnouncements();
  }

  async fetchRecentAnnouncements() {
    try {
      const announcementsRef = collection(this.firestore, 'announcements');
      const q = query(
        announcementsRef,
        orderBy('date', 'desc'),
        limit(3)
      );
      const querySnapshot = await getDocs(q);

      this.recentAnnouncements = querySnapshot.docs.map(doc => {
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
    }
  }
}
