import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  imports: [
    CommonModule
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  public eventList = [
    {
      id: 1,
      title: 'Event Title #1',
      date: '03/12/2025',
      description: 'To be added by admin',
      imgsrc: '/BRM Logo.jpg'
    },
    {
      id: 2,
      title: 'Event Title #2',
      date: '03/12/2025',
      description: 'To be added by admin',
      imgsrc: '/BRM Logo.jpg'
    },
    {
      id: 3,
      title: 'Event Title #3',
      date: '03/12/2025',
      description: 'To be added by admin',
      imgsrc: '/BRM Logo.jpg'
    },
    {
      id: 4,
      title: 'Event Title #3',
      date: '03/12/2025',
      description: 'To be added by admin',
      imgsrc: '/BRM Logo.jpg'
    },
  ];

  public eventHistory = [
    {
      id: 1,
      title: 'Event Title #1',
      date: '03/12/2024',
      description: 'To be added by admin',
      imgsrc: '/BRM Logo.jpg'
    },
    {
      id: 2,
      title: 'Event Title #2',
      date: '03/12/2024',
      description: 'To be added by admin',
      imgsrc: '/BRM Logo.jpg'
    },
    {
      id: 3,
      title: 'Event Title #3',
      date: '03/12/2024',
      description: 'To be added by admin',
      imgsrc: '/BRM Logo.jpg'
    },
  ];

  /*
  public filteredEventList = [...this.eventList];
  public filteredEventHistory = [...this.eventHistory];

  filterEvents(month: string) {
    if (month) {
      this.filteredEventList = this.eventList.filter(event => new Date(event.date).toLocaleString('default', { month: 'long' }) === month);
      this.filteredEventHistory = this.eventHistory.filter(event => new Date(event.date).toLocaleString('default', { month: 'long' }) === month);
    } else {
      this.filteredEventList = [...this.eventList];
      this.filteredEventHistory = [...this.eventHistory];
    }
  }
  */
}