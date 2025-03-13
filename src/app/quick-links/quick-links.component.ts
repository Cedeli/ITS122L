import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  async becomeMember(): Promise<void> {
    try {
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          const userDocRef = doc(this.firestore, 'users', user.uid);
          updateDoc(userDocRef, { role: 'member' }).then(() => {
            console.log('Role updated to member');
          }).catch(error => {
            console.error('Error updating role:', error);
          });
        } else {
          console.log('No user is currently logged in.');
        }
      });
    } catch (error) {
      console.error('Error updating role:', error);
    }
  }
}