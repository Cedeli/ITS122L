import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {getStorage} from '@angular/fire/storage';

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
    title: '',
    date: '',
    location: '',
    description: '',
    imgsrc: null,
  };

  file?: File;
  isUploading = false;
  uploadProgress = 0;

  constructor(private firestore: Firestore) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  async saveEvent() {

    if (!this.file) {
      alert('Please select an image to upload.');
      return;
    }

    this.isUploading = true;

    try {
      const storage = getStorage();
      const filePath = `events/${this.file.name}`;
      const eventsCollection = collection(this.firestore, 'events');
      await addDoc(eventsCollection, this.event);
      console.log('Event saved successfully!');

      this.resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  // Reset the form for a new event
  resetForm() {
    this.event = {
      title: '',
      date: '',
      location: '',
      description: '',
      imgsrc: null,
    };
  }

}
