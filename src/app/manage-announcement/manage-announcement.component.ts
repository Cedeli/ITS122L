import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    date: '',
    summary: '',
    important: false
  };

  saveAnnouncement() {
    // Logic to save the announcement
  }
}
