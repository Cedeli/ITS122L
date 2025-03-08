import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-events',
  standalone: false,
  templateUrl: './featured-events.component.html',
  styleUrls: ['./featured-events.component.scss']
})
export class FeaturedEventsComponent implements OnInit {
  featuredEvents: Array<{ id: number, title: string, date: string, description: string, imageUrl: string }> = [];

  constructor() { }

  ngOnInit(): void {
    this.featuredEvents = [
      {
        id: 1,
        title: 'Rosary Month',
        date: 'March 2025',
        description: 'description lorem',
        imageUrl: 'placeholder.png'
      },
      {
        id: 2,
        title: 'Community Outreach',
        date: 'March 7, 2025',
        description: 'amongusmaongus',
        imageUrl: 'placeholder.png'
      },
      {
        id: 3,
        title: 'Annual General Meeting',
        date: 'March 7, 2025',
        description: 'ogmasudsay',
        imageUrl: 'placeholder.png'
      }
    ];
  }
}
