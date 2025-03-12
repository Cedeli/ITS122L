import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-event',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent {
  event = {
    name: '',
    date: '',
    location: '',
    description: ''
  };

  saveEvent() {
    // Logic to save the event
  }
}
