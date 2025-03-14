import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MemberRequestComponent } from '../member-request/member-request.component';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./quick-links.component.scss'],
  standalone: true,
})
export class QuickLinksComponent {

  constructor(private firestore: Firestore,
              private authService: AuthService,
              private dialog: MatDialog) { }

  async becomeMember(): Promise<void> {
    try {
      this.authService.getCurrentUser().subscribe(user => {
        if (user != null) {
          const userDocRef = doc(this.firestore, 'users', user.uid);
          updateDoc(userDocRef, { pending_request: true }).then(() => {
            console.log('Request Sent');
          }).catch(error => {
            console.error('Error updating request:', error);
          });
          const dialogRef = this.dialog.open(MemberRequestComponent, {
            width: '400px',
            height: '200px',
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              console.log('Dialog result:', result);
            }
          });

        } else {
          window.location.href = '/login';
        }
      });
    } catch (error) {
      console.error('Error updating role:', error);
    }
  }
}
