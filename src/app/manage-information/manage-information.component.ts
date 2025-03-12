import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-information',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './manage-information.component.html',
  styleUrls: ['./manage-information.component.scss']
})
export class ManageInformationComponent {
  information = {
    title: '',
    content: ''
  };

  saveInformation() {
    // Logic to save the information
  }
}
