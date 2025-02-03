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
        await expect(favoriteButton).toHaveAttribute('ng-reflect-is-favorite', 'true');

    });

    test('should navigate to user profile page when clicking on a user card', async ({ page }) => {

        const userCard = page.locator('.user-card').first();
        await userCard.click();
        await expect(page).toHaveURL(/\/profiles\/\d+/);

    });

    test('should allow clicking the "View More" button to navigate to user profile', async ({ page }) => {

        const viewMoreButton = page.locator('button:has-text("View More")').first();
        await viewMoreButton.click();
        await expect(page).toHaveURL(/\/profiles\/\d+/);

    });

    test('should show correct email and phone for each user', async ({ page }) => {

        const userCard = page.locator('.user-card').first();
        await expect(userCard.locator('a[href^="mailto:"]')).toBeVisible();
        await expect(userCard.locator('a[href^="tel:"]')).toBeVisible();

    });

    test('should open external website in a new tab', async ({ page, context }) => {

        const userWebsiteLink = page.locator('a[href^="http"]').first();
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            userWebsiteLink.click(),
        ]);

        await expect(newPage).toHaveURL(/https?:\/\//);
        await newPage.close();

    });

});
