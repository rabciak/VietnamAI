import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Start' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Menu' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'O Nas' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Kontakt' })).toBeVisible();
  });

  test('should navigate to all pages', async ({ page }) => {
    // Navigate to Menu
    await page.getByRole('link', { name: 'Menu' }).click();
    await expect(page).toHaveURL('/menu');

    // Navigate to About
    await page.getByRole('link', { name: 'O Nas' }).click();
    await expect(page).toHaveURL('/about');

    // Navigate to Contact
    await page.getByRole('link', { name: 'Kontakt' }).click();
    await expect(page).toHaveURL('/contact');

    // Navigate back to Home
    await page.getByRole('link', { name: 'Start' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should highlight active navigation item', async ({ page }) => {
    // Check home is active
    const homeLink = page.getByRole('link', { name: 'Start' });
    await expect(homeLink).toHaveClass(/text-primary/);

    // Navigate to menu and check it's active
    await page.getByRole('link', { name: 'Menu' }).click();
    const menuLink = page.getByRole('link', { name: 'Menu' });
    await expect(menuLink).toHaveClass(/text-primary/);
  });

  test('mobile navigation should work', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Click mobile menu button
    const menuButton = page.getByRole('button', { name: 'Toggle menu' });
    await menuButton.click();

    // Check mobile menu is visible
    await expect(page.getByRole('link', { name: 'Menu' })).toBeVisible();

    // Click a link
    await page.getByRole('link', { name: 'Kontakt' }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('logo should navigate to home', async ({ page }) => {
    await page.goto('/menu');
    await page.locator('img[alt="Vietnam House"]').click();
    await expect(page).toHaveURL('/');
  });
});
