import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4200';

test.describe('User Profiles Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/profiles`);
        await page.waitForLoadState('domcontentloaded');
    });

    test('should allow favoriting a profile', async ({ page }) => {
        const favoriteButton = page.locator('crx-favorite-button').first();
        await favoriteButton.waitFor({ state: 'visible' });
        await favoriteButton.click();

        // Validate favorite button state change
        await expect(favoriteButton).toHaveAttribute('ng-reflect-is-favorite', 'true');
    });
});