import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutSummaryComponent } from './about-summary.component';
import { provideRouter, Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';

describe('AboutSummaryComponent', () => {
  let component: AboutSummaryComponent;
  let fixture: ComponentFixture<AboutSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AboutSummaryComponent, AboutComponent ],
      providers: [
        provideRouter([
          { path: 'about', component: AboutComponent }
        ])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AboutSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
