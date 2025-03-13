import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Firestore, doc, getDoc, Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Announcement } from '../models/announcement.model';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  imports: [
    RouterLink,
    CommonModule
  ],
  styleUrls: ['./announcement-detail.component.scss'],
  standalone: true
})
export class AnnouncementDetailComponent implements OnInit {
  public announcement: Announcement | null = null;
  public isLoading = true;
  public error: string | null = null;

  constructor(
      private firestore: Firestore,
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchAnnouncementDetails(id);
    } else {
      this.error = 'Announcement ID not found';
      this.isLoading = false;
    }
  }

  async fetchAnnouncementDetails(id: string) {
    try {
      this.isLoading = true;
      const announcementRef = doc(this.firestore, 'announcements', id);
      const docSnap = await getDoc(announcementRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
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

        this.announcement = {
          id: docSnap.id,
          title: data['title'] || '',
          date: formattedDate,
          summary: data['summary'] || '',
          description: data['description'] || '',
          important: Boolean(data['important']),
          author: data['author'] || '',
          imageUrl: data['imageUrl'] || null
        };
      } else {
        this.error = 'Announcement not found';
      }
    } catch (error) {
      console.error('Error fetching announcement details:', error);
      this.error = 'Error loading announcement';
    } finally {
      this.isLoading = false;
    }
  }
}
