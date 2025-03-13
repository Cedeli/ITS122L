import { Injectable } from '@angular/core';
import {
  Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as FirebaseUser
} from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Service responsible for handling all authentication-related operations.
 * Integrates Firebase Authentication with Firestore for user data management.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Creates a new instance of the AuthService.
   * Uses Angular dependency injection to get Firebase service instances.
   *
   * @param auth - Firebase Authentication instance for handling user authentication
   * @param firestore - Firestore instance for managing user profile data
   */
  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  /**
   * Gets an Observable that emits the current Firebase user whenever the authentication state changes.
   *
   * @returns Observable that emits the current Firebase user or null when signed out
   */
  getCurrentUser(): Observable<FirebaseUser | null> {
    return new Observable<FirebaseUser | null>(observer => {
      return onAuthStateChanged(this.auth, user => {
        observer.next(user);
      }, error => {
        observer.error(error);
      });
    });
  }

  /**
   * Retrieves the user's custom data from Firestore database.
   *
   * Implementation details:
   * - Uses doc() to get a reference to the user document in Firestore
   * - Uses from() to convert the Promise returned by getDoc() into an Observable
   * - Uses the map() operator to transform the DocumentSnapshot into our User model
   * - The map() operator creates a new Observable that applies a transformation function
   *   to each value emitted by the source Observable
   * - If the document exists, it converts the data to our User type; otherwise returns null
   *
   * @param uid - User ID of the user whose data to retrieve
   * @returns Observable containing the user data or null if the user doesn't exist
   */
  getUserData(uid: string): Observable<User | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userRef)).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          return { ...userData, uid: docSnap.id }; // Use uid here
        } else {
          return null;
        }
      })
    );
  }

  /**
   * Gets the current user with custom data from Firestore database.
   *
   * Implementation details:
   * - Uses getCurrentUser() to get the current Firebase user
   * - Uses switchMap() to chain the getCurrentUser() Observable with the getUserData() Observable
   * - If a user is authenticated, it retrieves the user's custom data from Firestore
   * - If no user is authenticated, it returns an Observable of null
   *
   * @returns Observable containing the current user with custom data or null if no user is authenticated
   */
  getCombinedUserData(): Observable<User | null> {
    return this.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.getUserData(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  /**
   * Authenticates a user with email and password.
   * Sets persistence level based on "remember me" option.
   * Updates the last login timestamp in Firestore.
   *
   * @param email - User's email address
   * @param password - User's password
   * @param rememberMe - Whether to persist the session across browser restarts
   * @returns Promise that resolves when authentication completes
   */
  async loginWithEmail(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await setPersistence(this.auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

    return signInWithEmailAndPassword(this.auth, email, password).then(async (result) => {
      const userRef = doc(this.firestore, `users/${result.user.uid}`);
      await updateDoc(userRef, {
        last_login: new Date().toISOString()
      });
    });
  }

  /**
   * Authenticates a user with Google OAuth.
   *
   * Implementation details:
   * - Creates a GoogleAuthProvider instance for Google authentication
   * - Uses signInWithPopup() to show the Google login popup window
   * - After successful authentication, checks if the user exists in Firestore
   * - If not, creates a new user document with data from the Google profile
   * - Extracts first and last name from the Google display name using array destructuring
   *   and the rest parameter syntax (...lastNameParts)
   *
   * @returns Promise that resolves when Google authentication completes
   */
  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(this.auth, provider).then(async (result) => {
      const user = result.user;

      const userRef = doc(this.firestore, `users/${user.uid}`);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const [firstName, ...lastNameParts] = user.displayName?.split(' ') || ['', ''];
        const lastName = lastNameParts.join(' ');

        const userData: User = {
          uid: user.uid,
          email: user.email || '',
          first_name: firstName,
          last_name: lastName,
          role: 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        await setDoc(userRef, userData);
      }
    });
  }

  /**
   * Registers a new user with email and password.
   *
   * Implementation details:
   * - Creates a new user account in Firebase Authentication
   * - Updates the user's display name in Firebase Authentication
   * - Creates a new user document in Firestore with extended profile information
   * - Uses Promise chaining for sequential async operations
   * - Handles partial user data with TypeScript's Partial<T> type
   *
   * @param email - User's email address
   * @param password - User's password
   * @param userData - User profile data to store in Firestore
   * @returns Promise that resolves when registration completes
   */
  async register(email: string, password: string, userData: Partial<User>): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(async (result) => {
      const user = result.user;

      if (userData.first_name || userData.last_name) {
        const displayName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim();
        await updateProfile(user, { displayName });
      }

      const userRef = doc(this.firestore, `users/${user.uid}`);

      const newUserData: User = {
        uid: user.uid,
        email: email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        birth_date: userData.birth_date,
        age: userData.age,
        phone_number: userData.phone_number,
        address: userData.address,
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      return setDoc(userRef, newUserData);
    });
  }

  /**
   * Signs out the current user.
   * Uses Firebase's signOut method to clear the authentication state.
   *
   * @returns Promise that resolves when sign out completes
   */
  async logout(): Promise<void> {
    return signOut(this.auth);
  }

  /**
   * Sends a password reset email to the specified email address.
   * Uses Firebase Authentication's built-in password reset functionality.
   *
   * @param email - Email address to send the password reset link to
   * @returns Promise that resolves when the reset email is sent
   */
  async resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  /**
   * Updates a user's profile data in Firestore.
   * Takes partial user data allowing update of specific fields.
   * Automatically sets the updated_at timestamp.
   *
   * @param uid - User ID of the user to update
   * @param userData - Partial user data to update
   * @returns Promise that resolves when the update completes
   */
  async updateUserProfile(uid: string, userData: Partial<User>): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    userData.updated_at = new Date().toISOString();

    return updateDoc(userRef, userData);
  }

  /**
   * Checks if a user is currently authenticated.
   * Returns an Observable for reactive authentication state.
   *
   * @returns Observable boolean that is true when a user is authenticated
   */
  isAuthenticated(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      switchMap(user => of(!!user))
    );
  }

  /**
   * Gets the current user's role from Firestore.
   *
   * Implementation details:
   * - First gets the current user with getCurrentUser()
   * - Uses switchMap() to create a new Observable based on the user value:
   *   * If user exists, gets user data from Firestore
   *   * If no user, returns Observable of undefined
   * - Nested switchMap() to extract just the role field from user data
   * - This pattern allows for reactive role-based authorization that
   *   automatically updates when authentication state changes
   *
   * @returns Observable containing the user's role or undefined
   */
  getUserRole(): Observable<string | undefined> {
    return this.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.getUserData(user.uid).pipe(
            switchMap(userData => of(userData?.role))
          );
        } else {
          return of(undefined);
        }
      })
    );
  }
}
