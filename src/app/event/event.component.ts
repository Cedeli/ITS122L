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
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quisquam doloremque nostrum laboriosam, blanditiis libero corporis nulla a aut?',
      imgsrc: '/placeholder.png'
    },
    {
      id: 2,
      title: 'Event Title #2',
      date: '03/12/2025',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quisquam doloremque nostrum laboriosam, blanditiis libero corporis nulla a aut?',
      imgsrc: '/placeholder.png'
    },
    {
      id: 3,
      title: 'Event Title #3',
      date: '03/12/2025',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quisquam doloremque nostrum laboriosam, blanditiis libero corporis nulla a aut?',
      imgsrc: '/placeholder.png'
    },
    {
      id: 4,
      title: 'Event Title #3',
      date: '03/12/2025',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quisquam doloremque nostrum laboriosam, blanditiis libero corporis nulla a aut?',
      imgsrc: '/placeholder.png'
    },
  ];

  public eventHistory = [
    {
      id: 1,
      title: 'Event Title #1',
      date: '03/12/2024',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quisquam doloremque nostrum laboriosam, blanditiis libero corporis nulla a aut?',
      imgsrc: '/placeholder.png'
    },
    {
      id: 2,
      title: 'Event Title #2',
      date: '03/12/2024',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quisquam doloremque nostrum laboriosam, blanditiis libero corporis nulla a aut?',
      imgsrc: '/placeholder.png'
    },
    {
      id: 3,
      title: 'Event Title #3',
      date: '03/12/2024',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quisquam doloremque nostrum laboriosam, blanditiis libero corporis nulla a aut?',
      imgsrc: '/placeholder.png'
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