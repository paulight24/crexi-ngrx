import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WA_WINDOW } from '@ng-web-apis/common';

@Injectable({
    providedIn: 'root' // Singleton Service
})
export class LocalStorageService {

    constructor (@Inject(WA_WINDOW) private window: Window) { }

    private platformId = inject(PLATFORM_ID);

    /** Check if were running in the browser before accessing LocalStorage */
    private isBrowser (): boolean {

        return isPlatformBrowser(this.platformId);

    }

    /** Get value from LocalStorage */
    getItem<T>(key: string): T | null {

        if (!this.isBrowser()) {

            return null;

        }
        const item = this.window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;

    }

    /** Set value in LocalStorage */
    setItem<T>(key: string, value: T): void {

        if (!this.isBrowser()) {

            return;

        }
        this.window.localStorage.setItem(key, JSON.stringify(value));

    }

    /** Remove item from LocalStorage */
    removeItem (key: string): void {

        if (!this.isBrowser()) {

            return;

        }
        this.window.localStorage.removeItem(key);

    }

}
