import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  email: string;
  role: string;
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
  users$: Observable<User[]>;

  constructor(private firestore: Firestore) {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection) as Observable<User[]>;
  }

  ngOnInit(): void {
  }
}