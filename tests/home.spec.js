import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title and logo', async ({ page }) => {
    // Check logo is visible
    await expect(page.locator('img[alt="Vietnam House"]')).toBeVisible();

    // Check main heading
    await expect(page.locator('h1')).toContainText('Autentyczna Kuchnia Wietnamska w Zamościu');
  });

  test('should display hero section with CTAs', async ({ page }) => {
    // Check hero text
    await expect(page.getByText('Świeże składniki i tradycyjne przepisy')).toBeVisible();

    // Check CTA buttons
    await expect(page.getByRole('link', { name: 'Zobacz Menu' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Zarezerwuj Stolik' })).toBeVisible();
  });

  test('should navigate to menu page when clicking "Zobacz Menu"', async ({ page }) => {
    await page.getByRole('link', { name: 'Zobacz Menu' }).first().click();
    await expect(page).toHaveURL('/menu');
  });

  test('should display featured dishes section', async ({ page }) => {
    await expect(page.getByText('Nasze Specjalności')).toBeVisible();

    // Check for dish names
    await expect(page.getByText('Pho Bo')).toBeVisible();
    await expect(page.getByText('Pad Thai')).toBeVisible();
    await expect(page.getByText('Sajgonki')).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await expect(page.getByText('Odwiedź Nas')).toBeVisible();
    await expect(page.getByText('665 559 841')).toBeVisible();
    await expect(page.getByText('Pn-Nd: 11:00 - 21:00')).toBeVisible();
    await expect(page.getByText('Zamość')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that mobile menu button is visible
    const menuButton = page.getByRole('button', { name: 'Toggle menu' });
    await expect(menuButton).toBeVisible();
  });
});
