import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnnouncementComponent } from './manage-announcement.component';

describe('ManageAnnouncementComponent', () => {
  let component: ManageAnnouncementComponent;
  let fixture: ComponentFixture<ManageAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
