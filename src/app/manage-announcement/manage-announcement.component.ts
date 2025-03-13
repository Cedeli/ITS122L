import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AnnouncementService } from '../services/announcement.service';

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
  announcement = {
    id: '',
    title: '',
    date: null,
    type: '',
    description: '',
    summary: '',
    important: false
  };
  announcements$: Observable<any[]> | undefined;

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  saveAnnouncement() {
    if (this.announcement.id && this.announcement.id.trim() !== '') {
      this.announcementService.updateAnnouncement(this.announcement.id, this.announcement)
          .then(() => {
            console.log('Announcement updated successfully!');
            this.resetForm();
          })
          .catch((error) => {
            console.error('Error updating announcement: ', error);
          });
    } else {
      this.announcementService.createAnnouncement(this.announcement)
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
    this.announcements$ = this.announcementService.getAnnouncements();
  }

  editAnnouncement(announcement: any) {
    this.announcement = { ...announcement };
  }

  deleteAnnouncement(announcementId: string) {
    this.announcementService.deleteAnnouncement(announcementId)
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
      type: '',
      description: '',
      summary: '',
      important: false
    };
  }
}
