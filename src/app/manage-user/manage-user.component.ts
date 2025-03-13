import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

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
  user: User = {
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    age: 0,
    birthDate: '',
    phoneNumber: '',
    role: 'user', // default
    uid: '' // uid documentID
  };

  constructor(private firestore: Firestore, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData(): Promise<void> {
    try {
      this.authService.getCombinedUserData().subscribe(userData => {
        if (userData) {
          this.user = {
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            email: userData.email || '',
            address: userData.address || '',
            age: userData.age || 0,
            birthDate: userData.birth_date || '',
            phoneNumber: userData.phone_number || '',
            role: userData.role || 'user',
            uid: userData.uid || '' 
          };
        } else {
          console.log('No user is currently logged in.');
        }
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  async saveUser(): Promise<void> {
    try {
      if (this.user.uid) { 
        const userDocRef = doc(this.firestore, 'users', this.user.uid);
        await updateDoc(userDocRef, { ...this.user });
        console.log('User data updated successfully.');
        alert('User data updated successfully.');
      } else {
        console.log('No uid found for the user.');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }
}