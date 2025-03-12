import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible = true;

  constructor() { }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  toggle(): void {
    this.visible = !this.visible;
  }
}
