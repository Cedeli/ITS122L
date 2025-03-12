import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesFaqComponent } from './policies-faq.component';

describe('PoliciesFaqComponent', () => {
  let component: PoliciesFaqComponent;
  let fixture: ComponentFixture<PoliciesFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliciesFaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
