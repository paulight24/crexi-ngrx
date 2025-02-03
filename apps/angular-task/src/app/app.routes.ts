import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'profiles',
        loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule)
    },
    { path: '**', redirectTo: 'profiles' },
];
