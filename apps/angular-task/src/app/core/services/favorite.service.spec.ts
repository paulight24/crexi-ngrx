import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {

    let service: FavoriteService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [provideMockStore(), FavoriteService],
        });

        service = TestBed.inject(FavoriteService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

});
