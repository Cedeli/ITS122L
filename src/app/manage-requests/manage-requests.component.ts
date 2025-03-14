import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

interface UserRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  pending_request: boolean;
}

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  imports: [
    CommonModule,
  ],
  styleUrls: ['./manage-requests.component.scss'],
  standalone: true,
})
export class ManageRequestsComponent implements OnInit {

  users$: Observable<any[]>;

  constructor(private authService: AuthService, private firestore: Firestore) {
    const userCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(userCollection, { idField: 'id' }) as Observable<any[]>;
    this.users$ = this.users$.pipe(
      map(users => users.filter(user => user.pending_request === true))
    );
  }

  ngOnInit(): void {}

  approveRequest(user: UserRequest) {
    this.authService.approveMembershipRequest(user.id).subscribe({
      next: () => {
        alert(`Membership for ${user.first_name} ${user.last_name} has been approved!`);
      },
      error: (err) => {
        console.error('Error approving membership request:', err);
      }
    })
  }

  rejectRequest(user: UserRequest) {
    this.authService.rejectMembershipRequest(user.id).subscribe({
      next: () => {
        alert(`Membership for ${user.first_name} ${user.last_name} has been rejected!`);
      },
      error: (err) => {
        console.error('Error rejecting membership request:', err);
      }
    })
  }
}
