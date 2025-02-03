import { createAction, props } from '@ngrx/store';

export const toggleFavorite = createAction(
    '[Favorites] Toggle Favorite',
    props<{ userId: number }>()
);

export const loadFavorites = createAction(
    '[Favorites] Load Favorites',
    props<{ favorites: number[] }>()
);
