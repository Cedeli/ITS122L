import { Component, OnInit } from '@angular/core';
import { Firestore, doc, updateDoc, deleteDoc, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  age: number;
  birthDate: string;
  phoneNumber: string;
  role: string;
  uid: string;
}

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  users$: Observable<User[]>;
  user: User = {
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    age: 0,
    birthDate: '',
    phoneNumber: '',
    role: 'user',
    uid: ''
  };
  editing: boolean = false;

  constructor(private firestore: Firestore) {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'uid' }) as Observable<User[]>;
  }

  ngOnInit(): void {}

  editUser(u: User): void {
    this.user = { ...u };
    this.editing = true;
  }

  async saveUser(): Promise<void> {
    try {
      if (this.user.uid) {
        const userDocRef = doc(this.firestore, 'users', this.user.uid);
        await updateDoc(userDocRef, { ...this.user });
        console.log('User updated successfully.');
      } else {
        const usersCollection = collection(this.firestore, 'users');
        const docRef = await addDoc(usersCollection, this.user);
        this.user.uid = docRef.id;
        console.log('User created with id:', docRef.id);
      }
      this.resetForm();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  async deleteUser(uid: string): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, 'users', uid);
      await deleteDoc(userDocRef);
      console.log('User deleted successfully.');
      if (this.user.uid === uid) {
        this.resetForm();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.user = {
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      age: 0,
      birthDate: '',
      phoneNumber: '',
      role: 'user',
      uid: ''
    };
    this.editing = false;
  }
}
