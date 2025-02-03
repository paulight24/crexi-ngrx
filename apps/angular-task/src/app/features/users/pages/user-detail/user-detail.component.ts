import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserById } from '../../../../store/users/users.selectors';
import { FavoriteService } from '../../../../core/services/favorite.service';

@Component({
    selector: 'crx-user-detail',
    standalone: false,
    templateUrl: './user-detail.component.html',
    styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private store = inject(Store);
    private favoriteService = inject(FavoriteService);

    private userId = Number(this.route.snapshot.paramMap.get('id'));
    user = this.store.selectSignal(selectUserById(this.userId));

    constructor () {

        effect(() => {

            const userData = this.user();
            if (!userData) {

                console.warn(`User with ID ${this.userId} not found. Redirecting...`);
                this.goBack(); // Redirect if no user to display

            }

        });

    }

    toggleFavorite (userId: number) {

        this.favoriteService.toggleFavorite(userId);

    }

    isFavorite (userId: number): boolean {

        return this.favoriteService.isFavorite(userId);

    }

    goBack () {

        this.router.navigate(['/profiles']);

    }

}
