import { test, expect } from '@playwright/test';

const BASE_URL = process.env['BASE_URL'] || 'http://localhost:4200';

test.describe('User Profiles Page', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(`${BASE_URL}/profiles`);
        await page.waitForLoadState('domcontentloaded');

    });

    test('has title', async ({ page }) => {

        const title = page.locator('h1');
        await expect(title).toContainText('User Management');

    });

});
