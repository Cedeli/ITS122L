import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ManageAnnouncementComponent } from './manage-announcement.component';

describe('ManageAnnouncementComponent', () => {
  let component: ManageAnnouncementComponent;
  let fixture: ComponentFixture<ManageAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAnnouncementComponent],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with title, date, summary, and important fields', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[name="title"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="date"]')).toBeTruthy();
    expect(compiled.querySelector('textarea[name="summary"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="important"]')).toBeTruthy();
  });
});
