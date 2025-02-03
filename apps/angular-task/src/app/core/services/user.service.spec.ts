import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {

    let service: UserService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [provideMockStore(), UserService],
        });

        service = TestBed.inject(UserService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

});
