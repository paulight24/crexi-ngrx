import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, tap } from 'rxjs';
import { selectUsers } from '../../store/users/users.selectors';
import { LocalStorageService } from '../../utilities/local-storage-util/local-storage.service';
import { loadUsersSuccess } from '../../store/users/users.actions';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string, bs: string, catchPhrase: string };
  address: { street: string; suite: string; city: string; zipcode: string };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private store = inject(Store);
  private localStorageService = inject(LocalStorageService);
  private readonly STORAGE_KEY = 'STORED_USERS';

  // Read-only signal from store
  selectedUsers = this.store.selectSignal(selectUsers);

  constructor(private http: HttpClient) {
    // Load from LocalStorage on startup
    const storedUsers = this.localStorageService.getItem<User[]>(this.STORAGE_KEY);
    if (storedUsers && storedUsers.length) {
      this.store.dispatch(loadUsersSuccess({ users: storedUsers })); // Only dispatch if there are users
    }

    // Effect to Sync Store & LocalStorage
    effect(() => {
      const users = this.selectedUsers(); // Read-only signal
      if (users.length) {
        this.localStorageService.setItem(this.STORAGE_KEY, [...users]); // Sync to LocalStorage
      }
    });
  }

  fetchUsers(): Observable<User[]> {
    const storedUsers = this.localStorageService.getItem<User[]>(this.STORAGE_KEY);
    if (storedUsers && storedUsers.length) {
      return of(storedUsers); // Return cached users
    }

    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(users => {
        this.localStorageService.setItem(this.STORAGE_KEY, users); // Store in LocalStorage
        this.store.dispatch(loadUsersSuccess({ users })); // Update Store
      }),
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }
}