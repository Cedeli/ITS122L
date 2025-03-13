import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnouncementsComponent } from '../announcements/announcements.component';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('AnnouncementsComponent', () => {
  let component: AnnouncementsComponent;
  let fixture: ComponentFixture<AnnouncementsComponent>;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  beforeEach(async () => {
    firestoreSpy = jasmine.createSpyObj('Firestore', ['collection', 'query', 'orderBy', 'getDocs']);

    await TestBed.configureTestingModule({
      imports: [AnnouncementsComponent, RouterLink, CommonModule],
      providers: [
        {provide: Firestore, useValue: firestoreSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncementsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Loading announcements..." while loading', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Loading announcements...');
  });

  it('should display "No announcements available at this time." when no announcements are available', () => {
    component.isLoading = false;
    component.announcements = [];
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('No announcements available at this time.');
  });

  it('should display announcements', () => {
    const mockAnnouncements = [
      { id: '1', title: 'Test Announcement 1', date: '2024-01-01', summary: 'Summary 1', important: false },
      { id: '2', title: 'Test Announcement 2', date: '2024-01-02', summary: 'Summary 2', important: true }
    ];
    component.isLoading = false;
    component.announcements = mockAnnouncements;
    fixture.detectChanges();

    const announcementCards = fixture.nativeElement.querySelectorAll('.announcement-card');
    expect(announcementCards.length).toBe(2);
  });
});
