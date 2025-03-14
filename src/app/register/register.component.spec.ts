import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { User as FirebaseUser } from '@angular/fire/auth';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let router: Router;
  let navServiceMock: jasmine.SpyObj<NavbarService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['register', 'loginWithGoogle', 'getCurrentUser']);
    navServiceMock = jasmine.createSpyObj('NavbarService', ['hide']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent, LoginComponent, HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: NavbarService, useValue: navServiceMock},
        provideRouter([
          { path: 'login', component: LoginComponent },
          { path: 'home', component: HomeComponent}
        ]),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.contains('firstName')).toBeTrue();
    expect(component.registerForm.contains('lastName')).toBeTrue();
    expect(component.registerForm.contains('email')).toBeTrue();
    expect(component.registerForm.contains('password')).toBeTrue();
    expect(component.registerForm.contains('confirmPassword')).toBeTrue();
    expect(component.registerForm.contains('birthDate')).toBeTrue();
    expect(component.registerForm.contains('phoneNumber')).toBeTrue();
    expect(component.registerForm.contains('address')).toBeTrue();
  });

  it('form should be invalid when empty', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('firstName field validity', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const firstName = component.registerForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    firstName.setValue('');
    expect(firstName.hasError('required')).toBeTrue();

    firstName.setValue('John');
    expect(firstName.valid).toBeTrue();
  });
  it('lastName field validity', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const lastName = component.registerForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    lastName.setValue('');
    expect(lastName.hasError('required')).toBeTrue();

    lastName.setValue('John');
    expect(lastName.valid).toBeTrue();
  });

  it('email field validity', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTrue();

    email.setValue('invalid-email');
    expect(email.hasError('email')).toBeTrue();

    email.setValue('test@example.com');
    expect(email.valid).toBeTrue();
  });

  it('password field validity', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const password = component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTrue();

    password.setValue('123');
    expect(password.hasError('minlength')).toBeTrue();

    password.setValue('123456');
    expect(password.valid).toBeTrue();
  });

  it('confirmPassword field validity', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    const password = component.registerForm.controls['password'];


    confirmPassword.setValue('');
    expect(confirmPassword.hasError('required')).toBeTrue();

    password.setValue('123456');
    confirmPassword.setValue('123457');
    fixture.detectChanges();
    expect(component.registerForm.errors?.['passwordMismatch']).toBeTrue();

    confirmPassword.setValue('123456');
    fixture.detectChanges();
    expect(component.registerForm.errors?.['passwordMismatch']).toBeFalsy();
  });

  it('phoneNumber field validity', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const phoneNumber = component.registerForm.controls['phoneNumber'];
    expect(phoneNumber.valid).toBeFalsy();

    phoneNumber.setValue('');
    expect(phoneNumber.hasError('required')).toBeTrue();

    phoneNumber.setValue('123-456-7890');
    expect(phoneNumber.valid).toBeTrue();
  });

  it('should register with email and password on valid form submission', fakeAsync(() => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const navigateSpy = spyOn(router, 'navigate');
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      birthDate: '2025-01-01',
      phoneNumber: '123-456-7890',
      address: '123 Main St'
    });
    authServiceMock.register.and.returnValue(Promise.resolve());
    component.register();
    tick();

    expect(authServiceMock.register).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      {
        first_name: 'John',
        last_name: 'Doe',
        birth_date: new Date('2025-01-01').toISOString(),
        age: component.calculateAge('2025-01-01'),
        phone_number: '123-456-7890',
        address: '123 Main St'
      }
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle registration error', fakeAsync(() => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();

    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      birthDate: '2025-01-01',
      phoneNumber: '123-456-7890',
      address: '123 Main St'
    });

    authServiceMock.register.and.returnValue(Promise.reject({ code: 'auth/email-already-in-use' }));

    component.register();
    tick();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('The email address is already in use by another account.');
  }));

  it('should register with Google', fakeAsync(() => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const navigateSpy = spyOn(router, 'navigate');
    authServiceMock.loginWithGoogle.and.returnValue(Promise.resolve());

    component.registerWithGoogle();
    tick();

    expect(authServiceMock.loginWithGoogle).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle various registration error codes', fakeAsync(() => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();

    const testCases = [
      { code: 'auth/invalid-email', message: 'The email address is not valid.' },
      { code: 'auth/operation-not-allowed', message: 'Email/password accounts are not enabled.' },
      { code: 'auth/weak-password', message: 'The password is too weak. Please use a stronger password.' },
      { code: 'auth/too-many-requests', message: 'Too many unsuccessful attempts. Please try again later.' },
      { code: 'unknown', message: 'An error occurred during registration. Please try again.' }
    ];

    for (const testCase of testCases) {
      component.registerForm.setValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        birthDate: '2025-01-01',
        phoneNumber: '123-456-7890',
        address: '123 Main St'
      });
      authServiceMock.register.and.returnValue(Promise.reject({ code: testCase.code }));
      component.register();
      tick();
      fixture.detectChanges();
      expect(component.errorMessage).toBe(testCase.message);
    }
  }));

  it('should handle Google registration error', fakeAsync(() => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    authServiceMock.loginWithGoogle.and.returnValue(Promise.reject({ code: 'auth/popup-closed-by-user' }));

    component.registerWithGoogle();
    tick();
    fixture.detectChanges();
    expect(component.errorMessage).toBe('An error occurred during registration. Please try again.');
  }));


  it('should redirect to home if user is already authenticated on init', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    const mockFirebaseUser: Partial<FirebaseUser> = {
      uid: 'testUser',
      email: 'test@example.com',
      emailVerified: true,
      isAnonymous: false,
    };
    authServiceMock.getCurrentUser.and.returnValue(of(mockFirebaseUser as FirebaseUser));

    component.ngOnInit();
    tick();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));

  it('should call nav.hide() on init', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    expect(navServiceMock.hide).toHaveBeenCalled();
  });


  it('should not redirect if no user', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    expect(navigateSpy).not.toHaveBeenCalled();
  }));

  it('should calculate age correctly', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const today = new Date();
    const birthDate = `${today.getFullYear() - 20}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    expect(component.calculateAge(birthDate)).toEqual(20);

  });

  it('should return undefined for invalid birth date', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    expect(component.calculateAge('')).toBeUndefined();
    expect(component.calculateAge('invalid-date')).toBeUndefined();
  });

  it('should return correct age when birth month/day is after current month/day', () => {
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    fixture.detectChanges();
    const today = new Date();
    const nextYear = today.getFullYear() + 1;
    const birthDate = `${nextYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const age = component.calculateAge(birthDate)
    expect(age).toBeLessThan(0);
  });
});
