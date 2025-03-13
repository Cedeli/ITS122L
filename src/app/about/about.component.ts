import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [
    RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  public legalDocuments = [
    {
      id: 1,
      title: 'Document Title #1',
      description: 'To be added by admin',
    },
    {
      id: 2,
      title: 'Document Title #2',
      description: 'To be added by admin',
    },
    {
      id: 3,
      title: 'Document Title #3',
      description: 'To be added by admin',
    }
  ];
}
