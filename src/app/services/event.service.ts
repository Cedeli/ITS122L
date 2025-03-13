import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private firestore: Firestore) {}

  getEvents(): Observable<any[]> {
    const eventsCollection = collection(this.firestore, 'events');
    return collectionData(eventsCollection, { idField: 'id' }) as Observable<any[]>;
  }

  createEvent(event: any): Promise<any> {
    const eventsCollection = collection(this.firestore, 'events');
    return addDoc(eventsCollection, event);
  }

  updateEvent(eventId: string, event: any): Promise<void> {
    const eventDocRef = doc(this.firestore, `events/${eventId}`);
    return updateDoc(eventDocRef, event);
  }

  deleteEvent(eventId: string): Promise<void> {
    const eventDocRef = doc(this.firestore, `events/${eventId}`);
    return deleteDoc(eventDocRef);
  }
}
