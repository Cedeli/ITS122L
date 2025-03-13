import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAnnouncementsComponent } from './featured-announcements.component';

describe('FeaturedAnnouncementsComponent', () => {
  let component: FeaturedAnnouncementsComponent;
  let fixture: ComponentFixture<FeaturedAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedAnnouncementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
