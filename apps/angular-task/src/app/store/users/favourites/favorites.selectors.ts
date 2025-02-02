import { createFeatureSelector, createSelector } from '@ngrx/store';

// Select the `favorites` state
export const selectFavoritesState = createFeatureSelector<Set<number>>('favorites');

// Get all favorite users
export const selectFavorites = createSelector(
    selectFavoritesState,
    (favorites) => favorites
);
