import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-user',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent {
  user = {
    name: '',
    email: '',
    role: ''
  };

  saveUser() {
    // Logic to save the user
  }
}
