import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.showSection('policies');
  }

  ngOnDestroy(): void {

  }

  showSection(sectionId: string): void {
    const contents = this.el.nativeElement.querySelectorAll('.content');
    contents.forEach((section: any) => {
      this.renderer.removeClass(section, 'active');
    });

    const tabButtons = this.el.nativeElement.querySelectorAll('.tab-btn');
    tabButtons.forEach((btn: any) => {
      this.renderer.removeClass(btn, 'active');
    });

    const selectedSection = this.el.nativeElement.querySelector(`#${sectionId}`);
    this.renderer.addClass(selectedSection, 'active');

    const selectedButton = this.el.nativeElement.querySelector(`.tab-btn[onclick*="showSection('${sectionId}')"]`);
    if (selectedButton) {
      this.renderer.addClass(selectedButton, 'active');
    }
  }

  toggleAnswer(element: any): void {
    const answer = element.querySelector('.faq-answer');
    if (answer) {
      if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
      } else {
        answer.style.display = 'none';
      }
    }
  }
}
