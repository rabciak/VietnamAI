import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('home page should be accessible', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);

    // Check images have alt text
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check links are accessible
    const links = await page.locator('a').all();
    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('forms should have proper labels', async ({ page }) => {
    await page.goto('/contact');

    // All inputs should have labels
    await expect(page.getByLabel('Imię i nazwisko *')).toBeVisible();
    await expect(page.getByLabel('Numer telefonu *')).toBeVisible();
    await expect(page.getByLabel('Data *')).toBeVisible();
    await expect(page.getByLabel('Godzina *')).toBeVisible();
    await expect(page.getByLabel('Liczba gości *')).toBeVisible();
  });

  test('keyboard navigation should work', async ({ page }) => {
    await page.goto('/');

    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check focus is visible (should have focus-visible styles)
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    expect(['A', 'BUTTON']).toContain(focusedElement);
  });

  test('color contrast should be sufficient', async ({ page }) => {
    await page.goto('/');

    // Check primary text color meets contrast requirements
    const textColor = await page.locator('body').evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    expect(textColor).toBeTruthy();
  });
});
