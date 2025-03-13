import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  constructor(private firestore: Firestore) {}

  getAnnouncements(): Observable<any[]> {
    const announcementsCollection = collection(this.firestore, 'announcements');
    return collectionData(announcementsCollection, { idField: 'id' }) as Observable<any[]>;
  }

  createAnnouncement(announcement: any): Promise<any> {
    const announcementsCollection = collection(this.firestore, 'announcements');
    return addDoc(announcementsCollection, announcement);
  }

  updateAnnouncement(announcementId: string, announcement: any): Promise<void> {
    const announcementDocRef = doc(this.firestore, `announcements/${announcementId}`);
    return updateDoc(announcementDocRef, announcement);
  }

  deleteAnnouncement(announcementId: string): Promise<void> {
    const announcementDocRef = doc(this.firestore, `announcements/${announcementId}`);
    return deleteDoc(announcementDocRef);
  }
}
