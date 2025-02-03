import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { FavoriteService } from '../../../../core/services/favorite.service';
import { selectUserById } from '../../../../store/users/users.selectors';

describe('UserDetailComponent', () => {

    let component: UserDetailComponent;
    let fixture: ComponentFixture<UserDetailComponent>;
    let routerMock: jest.Mocked<Router>;
    let favoriteServiceMock: jest.Mocked<FavoriteService>;

    const mockUser = {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets'
        },
        address: { street: 'Kulas Light', city: 'Gwenborough', zipcode: '92998-3874' },
    };

    beforeEach(async () => {

        routerMock = {
            navigate: jest.fn(),
        } as unknown as jest.Mocked<Router>;

        favoriteServiceMock = {
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(false),
        } as unknown as jest.Mocked<FavoriteService>;

        await TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState: {
                        users: { users: [mockUser] },
                    },
                    selectors: [{ selector: selectUserById(1), value: mockUser }],
                }),
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } } },
                { provide: Router, useValue: routerMock },
                { provide: FavoriteService, useValue: favoriteServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should select the correct user from the store', () => {

        expect(component.user()).toEqual(mockUser);

    });

    it('should toggle favorite status', () => {

        component.toggleFavorite(1);
        expect(favoriteServiceMock.toggleFavorite).toHaveBeenCalledWith(1);

    });

    it('should return true if a user is a favorite', () => {

        favoriteServiceMock.isFavorite.mockReturnValueOnce(true);
        expect(component.isFavorite(1)).toBe(true);

    });

    it('should navigate back to /profiles when goBack() is called', () => {

        component.goBack();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/profiles']);

    });

});
