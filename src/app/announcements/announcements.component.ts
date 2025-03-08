import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent {
  public recentAnnouncements = [
    {
      id: 1,
      title: 'New Website Launch',
      date: 'March 7, 2025',
      summary: 'Cool new website!',
      important: true
    },
    {
      id: 2,
      title: 'Membership Renewal',
      date: 'March 7, 2025',
      summary: 'Information here.',
      important: false
    },
    {
      id: 3,
      title: 'Prayer Schedule Updated',
      date: 'March 7, 2025',
      summary: 'Scheduling.',
      important: false
    }
  ];
}
