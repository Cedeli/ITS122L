import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

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
})
export class ManageRequestsComponent implements OnInit {

  users: Observable<any[]> = new Observable<any[]>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.fetchUserRequest();
  }

  fetchUserRequest(): void {
      this.users = this.authService.getMembershipRequests();
  }


  approveRequest(user: UserRequest) {
    this.authService.approveMembershipRequest(user.id).subscribe({
      next: () => {
        alert(`Membership for ${user.first_name} ${user.last_name} has been approved!`);
        this.fetchUserRequest();
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
        this.fetchUserRequest();
      },
      error: (err) => {
        console.error('Error rejecting membership request:', err);
      }
    })
  }
}
