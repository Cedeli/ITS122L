import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { User as FirebaseUser } from '@angular/fire/auth';
import { NavbarService } from '../services/navbar.service';

/**
 * Component that handles user login functionality.
 * Provides both email/password and Google authentication methods.
 * Implements OnDestroy to properly clean up subscriptions.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  /**
   * Form group for the login form.
   * Contains email, password, and remember me controls.
   */
  loginForm: FormGroup;

  /**
   * Error message to display when login fails.
   * Set to null when no error exists.
   */
  errorMessage: string | null = null;

  /**
   * Flag indicating if authentication is in progress.
   * Used to display loading indicators and disable form controls.
   */
  isLoading = false;

  /**
   * Subscription to auth state changes.
   * Stored to unsubscribe when component is destroyed.
   */
  private authSubscription: Subscription | undefined;

  /**
   * Creates a new instance of the LoginComponent.
   * Initializes the login form with validation rules.
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
    private nav: NavbarService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
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

  /**
   * Getter for email form control.
   * Provides easy access to form control for validation.
   *
   * @returns FormControl for the email field
   */
  get email() { return this.loginForm.get('email'); }

  /**
   * Getter for password form control.
   * Provides easy access to form control for validation.
   *
   * @returns FormControl for the password field
   */
  get password() { return this.loginForm.get('password'); }

  /**
   * Handles email/password login form submission.
   * Validates form, manages loading state, and handles errors.
   * Navigates to home page on successful authentication.
   */
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.loginWithEmail(email, password, rememberMe)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Login error:', error);
        this.errorMessage = this.getErrorMessage(error.code);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  /**
   * Handles Google authentication.
   * Manages loading state and handles errors.
   * Navigates to home page on successful authentication.
   */
  loginWithGoogle(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.loginWithGoogle()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Google login error:', error);
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
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful login attempts. Please try again later.';
      default:
        return 'An error occurred during login. Please try again.';
    }
  }
}
