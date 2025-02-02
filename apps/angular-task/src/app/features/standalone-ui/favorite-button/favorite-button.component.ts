import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'crx-favorite-button',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule],
    templateUrl: './favorite-button.component.html',
    styleUrl: './favorite-button.component.scss',
})
export class FavoriteButtonComponent {
    @Input() isFavorite: boolean = false; // Receives favorite state from parent
    @Output() toggleFavorite = new EventEmitter<void>();
}