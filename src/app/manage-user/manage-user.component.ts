import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc, collection, collectionData } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

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
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  users$: Observable<User[]>;
  selectedUser: User | null = null;
  user: User = {
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    age: 0,
    birthDate: '',
    phoneNumber: '',
    role: 'user', // Default role
    uid: '' // uid documentID
  };
  editing: boolean = false;

  constructor(private firestore: Firestore, private authService: AuthService) {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'uid' }) as Observable<User[]>;
  }

  ngOnInit(): void {
  }

  loadUserData(user: User): void {
    this.selectedUser = user;
    this.user = { ...user };
    this.editing = true;
  }

  async saveUser(): Promise<void> {
    try {
      if (this.user.uid) {
        const userDocRef = doc(this.firestore, 'users', this.user.uid);
        await updateDoc(userDocRef, { ...this.user });
        console.log('User data updated successfully.');
        alert('User data updated successfully.');
        this.editing = false;
      } else {
        console.log('No uid found for the user.');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }

  cancelEdit(): void {
    this.editing = false;
    this.selectedUser = null;
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
  }
}