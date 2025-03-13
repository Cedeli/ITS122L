import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedEventsComponent } from './featured-events.component';
import { provideRouter, Router } from '@angular/router'; // Import
import { EventComponent } from '../event/event.component';

describe('FeaturedEventsComponent', () => {
  let component: FeaturedEventsComponent;
  let fixture: ComponentFixture<FeaturedEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedEventsComponent, EventComponent],
      providers: [
        provideRouter([
          { path: 'events/:id', component: EventComponent }
        ])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeaturedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize featuredEvents', () => {
    expect(component.featuredEvents).toBeDefined();
    expect(component.featuredEvents.length).toBeGreaterThan(0);
  });
});
