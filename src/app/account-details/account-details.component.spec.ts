import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccountDetailsComponent } from './account-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;
  let authServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of({ uid: 'testUid' })),
      getUserData: jasmine.createSpy('getUserData').and.returnValue(of({
        uid: 'testUid',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        birth_date: '2025-01-01',
        phone_number: '123-456-7890',
        address: '123 Main St',
        role: 'user'
      })),
      updateUserProfile: jasmine.createSpy('updateUserProfile').and.returnValue(Promise.resolve()),
      getUserRole: jasmine.createSpy('getUserRole').and.returnValue(of('user')),
      logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve()),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AccountDetailsComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user data', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.accountForm.get('firstName')?.value).toBe('Test');
    expect(component.accountForm.get('lastName')?.value).toBe('User');
    expect(component.accountForm.get('email')?.value).toBe('test@example.com');
    expect(component.accountForm.get('email')?.disabled).toBeTrue();
    expect(component.accountForm.get('birthDate')?.value).toBe('2025-01-01');
    expect(component.accountForm.get('phoneNumber')?.value).toBe('123-456-7890');
    expect(component.accountForm.get('address')?.value).toBe('123 Main St');
  }));

  it('should be invalid when empty', () => {
    component.accountForm.reset();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('should require first name', () => {
    const firstName = component.accountForm.get('firstName');
    firstName?.setValue('');
    expect(firstName?.valid).toBeFalsy();

    firstName?.setValue('John');
    expect(firstName?.valid).toBeTruthy();
  });

  it('should require last name', () => {
    const lastName = component.accountForm.get('lastName');
    lastName?.setValue('');
    expect(lastName?.valid).toBeFalsy();

    lastName?.setValue('Doe');
    expect(lastName?.valid).toBeTruthy();
  });

  it('should update user profile on valid form submission', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.accountForm.patchValue({
      firstName: 'Updated',
      lastName: 'User',
      birthDate: '1995-05-05',
      phoneNumber: '987-654-3210',
      address: '456 New Rd'
    });
    fixture.detectChanges();
    component.updateAccount();
    tick();

    expect(authServiceMock.updateUserProfile).toHaveBeenCalledWith('testUid', {
      first_name: 'Updated',
      last_name: 'User',
      birth_date: '1995-05-05',
      phone_number: '987-654-3210',
      address: '456 New Rd'
    });
    expect(component.successMessage).toBe('Profile updated successfully!');
  }));

  it('should load user data and populate form on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.currentUser).toBeDefined();
    expect(component.accountForm.get('email')?.value).toEqual('test@example.com');
  }));


  it('should handle error when loading user data', fakeAsync(() => {
    authServiceMock.getCurrentUser.and.returnValue(throwError(() => new Error('User not found')));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('User not found');
    expect(component.currentUser).toBeNull();
  }));

  it('should call logout and navigate to /login on successful logout', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    authServiceMock.logout.and.returnValue(Promise.resolve());

    component.logout();
    tick();

    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    expect(component.errorMessage).toBe('');
  }));

  it('should handle error on logout failure', fakeAsync(() => {
    authServiceMock.logout.and.returnValue(Promise.reject(new Error('Logout failed')));

    component.logout();
    tick();
    expect(component.errorMessage).toContain('Logout failed');
  }));

  it('should set user role on init', fakeAsync(() => {
    authServiceMock.getUserRole.and.returnValue(of('admin'));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.userRole).toBe('admin');
  }));
});
