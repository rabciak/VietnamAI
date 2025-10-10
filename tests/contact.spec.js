import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact information', async ({ page }) => {
    await expect(page.getByText('Skontaktuj się z nami')).toBeVisible();

    // Phone
    await expect(page.getByText('Telefon')).toBeVisible();
    await expect(page.getByRole('link', { name: '665 559 841' })).toBeVisible();

    // Email
    await expect(page.getByText('Email')).toBeVisible();
    await expect(page.getByRole('link', { name: 'kontakt@vietnamhouse.pl' })).toBeVisible();

    // Address
    await expect(page.getByText('Adres')).toBeVisible();
    await expect(page.getByText('Zamość')).toBeVisible();

    // Hours
    await expect(page.getByText('Godziny otwarcia')).toBeVisible();
    await expect(page.getByText('11:00 - 21:00')).toBeVisible();

    // Social Media
    await expect(page.getByText('Social Media')).toBeVisible();
    await expect(page.getByRole('link', { name: '@vietnam.house.zamosc' })).toBeVisible();
  });

  test('should display reservation form', async ({ page }) => {
    await expect(page.getByText('Zarezerwuj Stolik')).toBeVisible();
    await expect(page.getByLabel('Imię i nazwisko *')).toBeVisible();
    await expect(page.getByLabel('Numer telefonu *')).toBeVisible();
    await expect(page.getByLabel('Data *')).toBeVisible();
    await expect(page.getByLabel('Godzina *')).toBeVisible();
    await expect(page.getByLabel('Liczba gości *')).toBeVisible();
  });

  test('should submit reservation form', async ({ page }) => {
    // Fill out the form
    await page.getByLabel('Imię i nazwisko *').fill('Jan Kowalski');
    await page.getByLabel('Numer telefonu *').fill('123456789');
    await page.getByLabel('Data *').fill('2025-12-31');
    await page.getByLabel('Godzina *').fill('18:00');
    await page.getByLabel('Liczba gości *').selectOption('4');

    // Submit form
    await page.getByRole('button', { name: 'Wyślij Rezerwację' }).click();

    // Check success message
    await expect(page.getByText('Dziękujemy za rezerwację!')).toBeVisible();
    await expect(page.getByText('Skontaktujemy się z Tobą wkrótce')).toBeVisible();
  });

  test('phone link should have correct href', async ({ page }) => {
    const phoneLink = page.getByRole('link', { name: '665 559 841' }).first();
    await expect(phoneLink).toHaveAttribute('href', 'tel:665559841');
  });

  test('email link should have correct href', async ({ page }) => {
    const emailLink = page.getByRole('link', { name: 'kontakt@vietnamhouse.pl' });
    await expect(emailLink).toHaveAttribute('href', 'mailto:kontakt@vietnamhouse.pl');
  });

  test('facebook link should open in new tab', async ({ page }) => {
    const fbLink = page.getByRole('link', { name: '@vietnam.house.zamosc' });
    await expect(fbLink).toHaveAttribute('target', '_blank');
    await expect(fbLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
