import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

// Feature Selector
export const selectUsersState = createFeatureSelector<UsersState>('users');

// Select all users
export const selectUsers = createSelector(
    selectUsersState,
    (state) => state.users
);

// Select loading state
export const selectUsersLoading = createSelector(
    selectUsersState,
    (state) => state.loading
);

// Select error state
export const selectUsersError = createSelector(
    selectUsersState,
    (state) => state.error
);

export const selectUserById = (userId: number) =>
    createSelector(selectUsers, (users) =>
        users.find((user) => user.id === userId) || null);
