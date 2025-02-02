import { createReducer, on } from '@ngrx/store';
import { loadFavorites, toggleFavorite } from './favorites.actions';

export const initialFavoritesState: Set<number> = new Set();

export const favoritesReducer = createReducer(
    initialFavoritesState,
    on(loadFavorites, (_, { favorites }) => new Set(favorites)),
    on(toggleFavorite, (state, { userId }) => {
        const newFavorites = new Set(state);
        if (newFavorites.has(userId)) {
            newFavorites.delete(userId);
        } else {
            newFavorites.add(userId);
        }
        return newFavorites;
    })
);