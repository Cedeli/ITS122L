import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { provideRouter, Router, Routes } from '@angular/router';
import { ManageUserComponent } from '../manage-user/manage-user.component';
import { ManageEventComponent } from '../manage-event/manage-event.component';
import { ManageAnnouncementComponent } from '../manage-announcement/manage-announcement.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  const routes: Routes = [
    {
      path: 'admin',
      component: AdminComponent,
      children: [
        { path: 'user', component: ManageUserComponent },
        { path: 'event', component: ManageEventComponent },
        { path: 'announcement', component: ManageAnnouncementComponent },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent, ManageUserComponent, ManageEventComponent, ManageAnnouncementComponent],
      providers: [
        provideRouter(routes),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
