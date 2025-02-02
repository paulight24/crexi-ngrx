import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root' // Singleton Service
})
export class LocalStorageService {
  private platformId = inject(PLATFORM_ID);

  /** Check if were running in the browser before accessing LocalStorage */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /** Get value from LocalStorage */
  getItem<T>(key: string): T | null {
    if (!this.isBrowser()) return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /** Set value in LocalStorage */
  setItem<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  /** Remove item from LocalStorage */
  removeItem(key: string): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(key);
  }
}
