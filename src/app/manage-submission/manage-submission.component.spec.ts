import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubmissionComponent } from './manage-submission.component';

describe('ManageSubmissionComponent', () => {
  let component: ManageSubmissionComponent;
  let fixture: ComponentFixture<ManageSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
