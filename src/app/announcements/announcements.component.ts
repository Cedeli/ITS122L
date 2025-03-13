import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, query, orderBy, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  recentAnnouncements$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
  }
}
