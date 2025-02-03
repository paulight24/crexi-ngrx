import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../core/services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './users.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

    private actions$ = inject(Actions);
    private userService = inject(UserService);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            mergeMap(() =>
                this.userService.fetchUsers().pipe(
                    map((users) => loadUsersSuccess({ users })),
                    catchError((error) => of(loadUsersFailure({ error: error.message })))
                ))
        ));

}
