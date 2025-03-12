import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-manage-submission',
  imports: [
    CommonModule,
    FormsModule,
    AdminComponent,
  ],
  templateUrl: './manage-submission.component.html',
  styleUrls: ['./manage-submission.component.scss']
})
export class ManageSubmissionComponent {
  submission = {
    title: '',
    dueDate: '',
    description: ''
  };

  saveSubmission() {
    // Logic to save the submission
  }
}
