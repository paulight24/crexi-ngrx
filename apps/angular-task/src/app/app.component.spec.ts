import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterTestingModule],
            providers: [provideMockStore()],
        }).compileComponents();

    });

    it('should create the app', () => {

        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();

    });

    it(`should have as title 'angular-task'`, () => {

        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('angular-task');

    });

    it('should render title', () => {

        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('User Management');

    });

});
