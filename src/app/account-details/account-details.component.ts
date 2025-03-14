import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import type { User } from '../models/user.model';
import { take } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./account-details.component.scss'],
  standalone: true,
})
export class AccountDetailsComponent implements OnInit {
  accountForm: FormGroup;
  currentUser: User | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  userRole: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [''],
      phoneNumber: [''],
      address: [''],
      role: ['user']
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.getUserRole();
  }

  loadUserData(): void {
    this.isLoading = true;

    firstValueFrom(this.authService.getCurrentUser())
      .then(user => {
        if (!user) {
          throw new Error('No user is currently logged in.');
        }
        return firstValueFrom(this.authService.getUserData(user.uid));
      })
      .then(userData => {
        this.currentUser = userData;
        this.populateForm(userData);
      })
      .catch(error => {
        this.errorMessage = error instanceof Error ? error.message :
          'Failed to load user data. Please try again.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  getUserRole(): void {
    this.authService.getUserRole().pipe(take(1)).subscribe(
      (role) => {
        this.userRole = role;
      }
    );
  }

  populateForm(userData: User | null): void {
    if (userData) {
      this.accountForm.patchValue({
        email: userData.email,
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        birthDate: userData.birth_date || '',
        phoneNumber: userData.phone_number || '',
        address: userData.address || '',
        role: userData.role || 'user'
      });
    }
  }

  updateAccount(): void {
    if (this.accountForm.valid && this.currentUser) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const updatedData: Partial<User> = {
        first_name: this.accountForm.get('firstName')?.value,
        last_name: this.accountForm.get('lastName')?.value,
        birth_date: this.accountForm.get('birthDate')?.value,
        phone_number: this.accountForm.get('phoneNumber')?.value,
        address: this.accountForm.get('address')?.value,
      };

      if (this.userRole === 'admin') {
        updatedData.role = this.accountForm.get('role')?.value;
      }

      this.authService.updateUserProfile(this.currentUser.uid, updatedData)
        .then(() => {
          this.successMessage = 'Profile updated successfully!';
          this.isLoading = false;
        })
        .catch((error) => {
          this.errorMessage = `Failed to update profile: ${error.message}`;
          this.isLoading = false;
        });
    }
  }

  logout(): void {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.errorMessage = `Logout failed: ${error.message}`;
      });
  }

  get firstName() { return this.accountForm.get('firstName'); }
  get lastName() { return this.accountForm.get('lastName'); }
}
