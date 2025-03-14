import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EventComponent } from './event.component';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let eventServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    eventServiceMock = jasmine.createSpyObj('EventService', ['getEvents', 'updateEvent']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

    await TestBed.configureTestingModule({
      imports: [EventComponent, CommonModule],
      providers: [
        { provide: EventService, useValue: eventServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    eventServiceMock.getEvents.and.returnValue(of([])); // Mock getEvents initially
    authServiceMock.getCurrentUser.and.returnValue(of({ uid: 'testUser' }));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle error when fetching events', fakeAsync(() => {
    eventServiceMock.getEvents.and.returnValue(throwError(() => new Error('Test Error')));
    authServiceMock.getCurrentUser.and.returnValue(of({uid: 'testuser'}));
    fixture.detectChanges();
    tick();
    expect(component.isLoading).toBeFalse();
  }));

  it('should return placeholder image if imageUrl is null/undefined/empty', () =>
  {
    expect(component.checkImageUrl('')).toBe('BRM Logo.jpg');
    expect(component.checkImageUrl(undefined)).toBe('BRM Logo.jpg');
    expect(component.checkImageUrl('BRM Logo.jpg')).toBe('BRM Logo.jpg');
  });
});
