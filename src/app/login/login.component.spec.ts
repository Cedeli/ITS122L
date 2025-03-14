import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = {
      loginWithEmail: jasmine.createSpy('loginWithEmail').and.returnValue(Promise.resolve()),
      loginWithGoogle: jasmine.createSpy('loginWithGoogle').and.returnValue(Promise.resolve()),
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of(null)),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
    expect(component.loginForm.get('rememberMe')).toBeDefined();
  });

  it('should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should require email', () => {
    const email = component.loginForm.get('email');
    email?.setValue('');
    expect(email?.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    const email = component.loginForm.get('email');
    email?.setValue('invalid-email');
    expect(email?.valid).toBeFalsy();

    email?.setValue('test@example.com');
    expect(email?.valid).toBeTruthy();
  });

  it('should require password', () => {
    const password = component.loginForm.get('password');
    password?.setValue('');
    expect(password?.valid).toBeFalsy();
  });

  it('should validate password minlength', () => {
    const password = component.loginForm.get('password');
    password?.setValue('123');
    expect(password?.valid).toBeFalsy();

    password?.setValue('123456');
    expect(password?.valid).toBeTruthy();
  });

  it('should login with email and password on valid form submission', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
      rememberMe: false
    });

    component.login();
    tick();

    expect(authServiceMock.loginWithEmail).toHaveBeenCalledWith('test@example.com', 'password123', false);
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle login error', fakeAsync(() => {
    authServiceMock.loginWithEmail.and.returnValue(Promise.reject({ code: 'auth/user-not-found' }));
    component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpassword', rememberMe: false });

    component.login();
    tick();
    tick();

    expect(component.errorMessage).toBe('No user found with this email address.');
  }));

  it('should handle various login error codes', fakeAsync(() => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpassword', rememberMe: false });

    authServiceMock.loginWithEmail.and.returnValue(Promise.reject({ code: 'auth/wrong-password' }));
    component.login();
    tick();  tick();
    expect(component.errorMessage).toBe('Incorrect password.');

    authServiceMock.loginWithEmail.and.returnValue(Promise.reject({ code: 'auth/invalid-email' }));
    component.login();
    tick(); tick();
    expect(component.errorMessage).toBe('The email address is not valid.');

    authServiceMock.loginWithEmail.and.returnValue(Promise.reject({ code: 'auth/user-disabled' }));
    component.login();
    tick(); tick();
    expect(component.errorMessage).toBe('This account has been disabled.');

    authServiceMock.loginWithEmail.and.returnValue(Promise.reject({ code: 'auth/too-many-requests' }));
    component.login();
    tick(); tick();
    expect(component.errorMessage).toBe('Too many unsuccessful login attempts. Please try again later.');

    authServiceMock.loginWithEmail.and.returnValue(Promise.reject({ code: 'unknown-error' }));
    component.login();
    tick(); tick();
    expect(component.errorMessage).toBe('An error occurred during login. Please try again.');
  }));

  it('should login with Google', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    authServiceMock.loginWithGoogle.and.returnValue(Promise.resolve());

    component.loginWithGoogle();
    tick();

    expect(authServiceMock.loginWithGoogle).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle Google login error', fakeAsync(() => {
    authServiceMock.loginWithGoogle.and.returnValue(Promise.reject({ code: 'auth/popup-closed-by-user' }));
    component.loginWithGoogle();
    tick();
    tick();
    expect(component.errorMessage).toBe('An error occurred during login. Please try again.'); // Generic message
  }));

  it('should redirect to home if user is already authenticated on init', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    authServiceMock.getCurrentUser.and.returnValue(of({uid: 'testUser'})); // Simulate logged in user
    component.ngOnInit();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));

  it('should not redirect if no user', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    authServiceMock.getCurrentUser.and.returnValue(of(null));
    component.ngOnInit();
    tick();
    expect(navigateSpy).not.toHaveBeenCalled();
  }));

  it('should unsubscribe on destroy', () => {
    component.ngOnDestroy();
    expect(component['authSubscription']?.closed).toBeTrue();
  });
});
