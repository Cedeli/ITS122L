import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

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

  constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers() as Observable<User[]>;
  }

  ngOnInit(): void {}

  editUser(u: User): void {
    this.user = { ...u };
    this.editing = true;
  }

  async saveUser(): Promise<void> {
    try {
      if (this.user.uid) {
        await this.userService.updateUser(this.user.uid, this.user);
        console.log('User updated successfully.');
      } else {
        await this.userService.createUser(this.user);
        console.log('User created successfully.');
      }
      this.resetForm();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  async deleteUser(uid: string): Promise<void> {
    try {
      await this.userService.deleteUser(uid);
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
