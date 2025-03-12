import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { User as FirebaseUser } from '@angular/fire/auth';
import { User } from '../models/user.model';
import {NavbarService} from '../services/navbar.service';

/**
 * Component that handles user registration functionality.
 * Provides both email/password and Google authentication methods.
 * Implements OnDestroy to properly clean up subscriptions.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
  ],
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;

  /**
   * Error message to display when registration fails.
   * Set to null when no error exists.
   */
  errorMessage: string | null = null;

  isLoading = false;

  /**
   * Subscription to auth state changes.
   * Stored to unsubscribe when component is destroyed.
   */
  private authSubscription: Subscription | undefined;

  /**
   * Creates a new instance of the RegisterComponent.
   * Initializes the registration form with validation rules.
   *
   * @param fb - FormBuilder service for creating reactive forms
   * @param authService - Service for handling authentication operations
   * @param router - Router service for navigation
   * @param nav - Navigation bar component
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private nav: NavbarService,
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      birthDate: [''],
      phoneNumber: ['', [Validators.required]],
      address: ['']
    }, {
      validators: this.passwordMatchValidator
    });
  }

  /**
   * Custom validator to ensure password and confirm password match.
   *
   * @param control - The form group to validate
   * @returns ValidationErrors object if validation fails, null otherwise
   */
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  /**
   * Calculates age based on birthdate.
   * Handles age calculation accounting for month and day differences.
   *
   * @param birthDate - Birth date as string in format YYYY-MM-DD
   * @returns Calculated age as number, or undefined if no valid date provided
   */
  calculateAge(birthDate: string): number | undefined {
    if (!birthDate) {
      return undefined;
    }

    const birthDateObj = new Date(birthDate);
    if (isNaN(birthDateObj.getTime())) {
      console.error('Invalid birth date:', birthDate);
      return undefined;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();

    const hasBirthdayOccurred =
      today.getMonth() > birthDateObj.getMonth() ||
      (today.getMonth() === birthDateObj.getMonth() &&
        today.getDate() >= birthDateObj.getDate());

    if (!hasBirthdayOccurred) {
      age--;
    }

    return age;
  }

  /**
   * Redirects to home page if user is already authenticated.
   */
  ngOnInit(): void {
    this.nav.hide();
    this.authSubscription = this.authService.getCurrentUser().subscribe((user: FirebaseUser | null) => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  /**
   * Cleans up subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get birthDate() { return this.registerForm.get('birthDate'); }
  get phoneNumber() { return this.registerForm.get('phoneNumber'); }
  get address() { return this.registerForm.get('address'); }

  /**
   * Handles registration form submission.
   * Validates form, manages loading state, and handles errors.
   * Navigates to home page on successful registration.
   */
  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { email, password, firstName, lastName, birthDate, phoneNumber, address } = this.registerForm.value;

    const userData: Partial<User> = {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate ? new Date(birthDate).toISOString() : undefined,
      age: birthDate ? this.calculateAge(birthDate) : undefined,
      phone_number: phoneNumber,
      address: address
    };

    this.authService.register(email, password, userData)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Registration error:', error);
        this.errorMessage = this.getErrorMessage(error.code);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  /**
   * Handles Google authentication for registration.
   * Uses the same method as login since Google auth handles both cases.
   */
  registerWithGoogle(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.loginWithGoogle()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Google registration error:', error);
        this.errorMessage = this.getErrorMessage(error.code);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  /**
   * Translates Firebase error codes into user-friendly error messages.
   * Provides specific error messages for common authentication errors.
   *
   * @param errorCode - Firebase error code
   * @returns User-friendly error message
   */
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled.';
      case 'auth/weak-password':
        return 'The password is too weak. Please use a stronger password.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful attempts. Please try again later.';
      default:
        return 'An error occurred during registration. Please try again.';
    }
  }
}
