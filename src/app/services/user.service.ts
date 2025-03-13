import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  getUsers(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'users');
    return collectionData(usersCollection, { idField: 'uid' }) as Observable<any[]>;
  }

  createUser(user: any): Promise<any> {
    const usersCollection = collection(this.firestore, 'users');
    return addDoc(usersCollection, user);
  }

  updateUser(userId: string, user: any): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return updateDoc(userDocRef, user);
  }

  deleteUser(userId: string): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return deleteDoc(userDocRef);
  }
}
