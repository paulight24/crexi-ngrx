import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'crx-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    private store = inject(Store);
    title = 'angular-task';
}
