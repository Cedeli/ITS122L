import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-manage-user',
  imports: [
    CommonModule,
    FormsModule,
    AdminComponent
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
