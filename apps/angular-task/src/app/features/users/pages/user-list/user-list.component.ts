import { Component, inject, computed, effect, ChangeDetectionStrategy, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../../../store/users/users.actions';
import { selectUsers, selectUsersLoading, selectUsersError } from '../../../../store/users/users.selectors';
import { Router } from '@angular/router';
import { FavoriteService } from '../../../../core/services/favorite.service';

@Component({
    selector: 'crx-user-list',
    standalone: false,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
    private store = inject(Store);
    private favoriteService = inject(FavoriteService);
    private router = inject(Router);

    // Directly use selectors
    users = this.store.selectSignal(selectUsers);
    isLoading = this.store.selectSignal(selectUsersLoading);
    errorMessage = this.store.selectSignal(selectUsersError);
    filterText = signal('');

    constructor() {
        this.store.dispatch(loadUsers()); // Dispatch action to load users
    }

    /** Computed list of users based on filter **/
    filteredUsers = computed(() => {
        const filter = this.filterText().toLowerCase();
        return this.users().filter(user =>
            user.name.toLowerCase().includes(filter) ||
            user.username.toLowerCase().includes(filter) ||
            user.email.toLowerCase().includes(filter)
        );
    });

    /** Toggle favorite status **/
    toggleFavorite(userId: number) {
        this.favoriteService.toggleFavorite(userId);
    }

    /** Check if a user is a favorite **/
    isFavorite(userId: number): boolean {
        return this.favoriteService.isFavorite(userId);
    }

    /** Updates filter text based on user input **/
    updateFilter(event: Event) {
        const input = event.target as HTMLInputElement;
        this.filterText.set(input.value);
    }

    /** Clears the filter input **/
    clearFilter() {
        this.filterText.set('');
    }

    /** Navigation to profile page **/
    goToProfile(id: number) {
        this.router.navigate(['/profiles', id]);
    }
}