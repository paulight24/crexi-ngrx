import { createAction, props } from '@ngrx/store';
import { User } from '../../core/services/user.service';

// Load Users
export const loadUsers = createAction('[Users] Load Users');

// Users Loaded Successfully
export const loadUsersSuccess = createAction(
    '[Users] Load Users Success',
    props<{ users: User[] }>()
);

// Users Loading Failed
export const loadUsersFailure = createAction(
    '[Users] Load Users Failure',
    props<{ error: string }>()
);
