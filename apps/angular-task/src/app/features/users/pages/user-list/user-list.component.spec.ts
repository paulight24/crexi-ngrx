import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { FavoriteService } from '../../../../core/services/favorite.service';
import { selectUsers, selectUsersLoading, selectUsersError } from '../../../../store/users/users.selectors';

describe('UserListComponent (Jest)', () => {

    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let routerMock: jest.Mocked<Router>;
    let favoriteServiceMock: jest.Mocked<FavoriteService>;

    const mockUsers = [
        { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
        { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
        { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
        { id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org' },
        { id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca' },
    ];

    beforeEach(async () => {

        routerMock = {
            navigate: jest.fn(),
        } as unknown as jest.Mocked<Router>;

        favoriteServiceMock = {
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(false),
        } as unknown as jest.Mocked<FavoriteService>;

        await TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatButtonModule,
                MatIconModule,
                MatFormFieldModule,
            ],
            providers: [
                provideMockStore({
                    selectors: [
                        { selector: selectUsers, value: mockUsers },
                        { selector: selectUsersLoading, value: false },
                        { selector: selectUsersError, value: null },
                    ],
                }),
                { provide: Router, useValue: routerMock },
                { provide: FavoriteService, useValue: favoriteServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should filter users correctly by name', () => {

        component.filterText.set('Leanne');
        expect(component.filteredUsers()).toEqual([
            { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
        ]);

    });

    it('should filter users correctly by username', () => {

        component.filterText.set('Antonette');
        expect(component.filteredUsers()).toEqual([
            { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
        ]);

    });

    it('should filter users correctly by email', () => {

        component.filterText.set('Nathan@yesenia.net');
        expect(component.filteredUsers()).toEqual([
            { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
        ]);

    });

    it('should return all users when filter is empty', () => {

        component.filterText.set('');
        expect(component.filteredUsers()).toEqual(mockUsers);

    });

    it('should return an empty array when no user matches filter', () => {

        component.filterText.set('NonExistentUser');
        expect(component.filteredUsers()).toEqual([]);

    });

    it('should toggle favorite status of a user', () => {

        component.toggleFavorite(1);
        expect(favoriteServiceMock.toggleFavorite).toHaveBeenCalledWith(1);

    });

    it('should check if a user is a favorite', () => {

        favoriteServiceMock.isFavorite.mockReturnValueOnce(true);
        expect(component.isFavorite(1)).toBe(true);

    });

    it('should navigate to user profile page', () => {

        component.goToProfile(1);
        expect(routerMock.navigate).toHaveBeenCalledWith(['/profiles', 1]);

    });

    it('should update filterText when updateFilter is called', () => {

        const mockEvent = { target: { value: 'Chelsey' } } as unknown as Event;
        component.updateFilter(mockEvent);
        expect(component.filterText()).toEqual('Chelsey');

    });

    it('should clear filterText when clearFilter is called', () => {

        component.filterText.set('Chelsey');
        component.clearFilter();
        expect(component.filterText()).toEqual('');

    });

});
