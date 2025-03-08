import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent { }
