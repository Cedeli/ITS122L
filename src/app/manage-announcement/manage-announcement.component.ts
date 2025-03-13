import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
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
  number = 0;
  announcement = {
    id: this.number,
    title: '',
    date: null,
    type: '',
    description: '',
    summary: '',
    important: false
  };

  public typeList = [
    "Event page Information", "About Page Information", "Contact Page Information"
  ];

  announcements$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  saveAnnouncement() {
    this.announcement.id = this.number;
    const announcementsCollection = collection(this.firestore, 'announcements');
    addDoc(announcementsCollection, this.announcement)
      .then(() => {
        console.log('Announcement saved successfully!');
        this.number++;
        this.announcement = {...this.announcement, id: this.number};
      })
      .catch((error: any) => {
        console.error('Error saving announcement: ', error);
      });
  }

  loadAnnouncements() {
    const announcementsCollection = collection(this.firestore, 'announcements');
    this.announcements$ = collectionData(announcementsCollection, { idField: 'id' });
  }
}
