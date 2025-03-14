import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

interface User {
  name: string;
  email: string;
  role: string;
  documentId: string;
  address?: string;
  age?: number;
  first_name?: string;
  last_name?: string;
}

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
})
export class MembersListComponent implements OnInit {
  users$: Observable<User[]>;
  selectedUser: User | null = null;

  constructor(private firestore: Firestore) {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'documentId' }) as Observable<User[]>;
    this.users$ = this.users$.pipe(
      map(users => users.filter(user => user.role === 'member' || user.role === 'admin'))
    );
  }

  ngOnInit(): void {
  }

  async viewDetails(user: User): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, 'users', user.documentId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        this.selectedUser = userDocSnap.data() as User;
      } else {
        console.log('No such document!');
        this.selectedUser = null;
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      this.selectedUser = null;
    }
  }
}
