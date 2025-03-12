import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from "../admin/admin.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-announcement',
  imports: [
    CommonModule,
    FormsModule,
    AdminComponent,
    RouterOutlet
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
