import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {
  users: User[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.firestore.collection<User>('users').valueChanges().subscribe(data => {
      this.users = data;
    });
  }
}