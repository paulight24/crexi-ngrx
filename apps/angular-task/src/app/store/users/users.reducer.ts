import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './users.actions';
import { User } from '../../core/services/user.service';

export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

export const initialUsersState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

export const usersReducer = createReducer(
    initialUsersState,
    on(loadUsers, (state) => ({ ...state, loading: true, error: null })),
    on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
    on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
