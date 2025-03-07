import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {HomeComponent} from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BRMO';
}
