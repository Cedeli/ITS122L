import { Component, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-featured-events',
  templateUrl: './featured-events.component.html',
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./featured-events.component.scss']
})
export class FeaturedEventsComponent implements OnInit {
  featuredEvents: Array<{ id: number, title: string, date: string, description: string, imageUrl: string }> = [];

  constructor() { }

  ngOnInit(): void {
    this.featuredEvents = [
      {
        id: 1,
        title: 'Feast of the Holy Rosary',
        date: 'October',
        description: 'living rosary',
        imageUrl: '/BRM Logo.jpg'
      },
      {
        id: 2,
        title: 'Our Lady of Lourdes',
        date: 'February 11',
        description: 'blessing of the sick',
        imageUrl: '/BRM Logo.jpg'
      },
      {
        id: 3,
        title: 'BRM Big Day',
        date: 'May',
        description: 'good shepherd feast day',
        imageUrl: '/BRM Logo.jpg'
      }
    ];
  }
}
