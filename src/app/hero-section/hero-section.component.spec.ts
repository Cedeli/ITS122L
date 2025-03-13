import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section.component';
import { provideRouter, Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { EventComponent } from '../event/event.component';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent, AboutComponent, EventComponent],
      providers: [
        provideRouter([
          { path: 'about', component: AboutComponent },
          { path: 'events', component: EventComponent },
        ])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
