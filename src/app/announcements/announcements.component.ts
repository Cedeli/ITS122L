import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Firestore, collection, query, orderBy, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import type { Announcement } from '../models/announcement.model';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  imports: [
    RouterLink,
    CommonModule
  ],
  styleUrls: ['./announcements.component.scss'],
  standalone: true,
})
export class AnnouncementsComponent implements OnInit {
  public announcements: ({ id: string; title: string; date: string; summary: string; important: boolean })[] = [];
  public isLoading = true;

  constructor(
    private firestore: Firestore,
    private dateService: DateService
  ) {}

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

        return {
          id: doc.id,
          title: data['title'] || '',
          date: this.dateService.formatDate(data['date']),
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
