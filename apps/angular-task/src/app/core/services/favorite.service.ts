import { Injectable, inject, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadFavorites, toggleFavorite } from '../../store/users/favourites/favorites.actions';
import { selectFavorites } from '../../store/users/favourites/favorites.selectors';
import { LocalStorageService } from '../../utilities/local-storage-util/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    private store = inject(Store);
    private localStorageService = inject(LocalStorageService);
    private readonly storageKey = 'FAVOURITE_USERS';

    // Read-only signal from store
    favoriteUsers = this.store.selectSignal(selectFavorites);

    constructor () {

        // Load from LocalStorage on startup
        const storedFavorites = this.localStorageService.getItem<number[]>(this.storageKey) || [];
        this.store.dispatch(loadFavorites({ favorites: storedFavorites }));

        // Effect to Sync Store & LocalStorage
        effect(() => {

            const favorites = this.store.selectSignal(selectFavorites)(); // Read-only signal
            this.localStorageService.setItem(this.storageKey, [...favorites]); // Sync to LocalStorage

        });

    }

    /** Toggle favorite status via Store **/
    toggleFavorite (userId: number) {

        this.store.dispatch(toggleFavorite({ userId }));

    }

    /** Check if a user is a favorite **/
    isFavorite (userId: number): boolean {

        return this.favoriteUsers().has(userId);

    }

}
