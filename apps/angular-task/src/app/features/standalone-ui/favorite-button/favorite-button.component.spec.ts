import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteButtonComponent } from './favorite-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('FavoriteButtonComponent', () => {

    let component: FavoriteButtonComponent;
    let fixture: ComponentFixture<FavoriteButtonComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [FavoriteButtonComponent, MatIconModule, MatButtonModule],
        }).compileComponents();

        fixture = TestBed.createComponent(FavoriteButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should display the correct icon based on isFavorite input', () => {

        component.isFavorite = true;
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('mat-icon');
        expect(icon.textContent).toContain('favorite');

    });

    it('should emit toggleFavorite event when clicked', () => {

        const emitSpy = jest.spyOn(component.toggleFavorite, 'emit');

        const button = fixture.nativeElement.querySelector('button');
        button.click();

        expect(emitSpy).toHaveBeenCalled(); // ensures event is emitted

    });

});
