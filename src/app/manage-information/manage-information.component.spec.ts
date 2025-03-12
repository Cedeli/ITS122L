import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInformationComponent } from './manage-information.component';

describe('ManageInformationComponent', () => {
  let component: ManageInformationComponent;
  let fixture: ComponentFixture<ManageInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
