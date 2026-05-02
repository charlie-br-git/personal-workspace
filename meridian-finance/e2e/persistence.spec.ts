import { test, expect } from '@playwright/test';

test.describe('localStorage persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('edited expense amount survives page reload', async ({ page }) => {
    // Edit rent from $2,950 to $3,500
    await page.getByRole('button', { name: /Edit amount.*\$2,950/ }).first().click();
    await page.keyboard.selectAll();
    await page.keyboard.type('3500');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: /Edit amount.*\$3,500/ })).toBeVisible();

    // Reload and verify value persists
    await page.reload();
    await expect(page.getByRole('button', { name: /Edit amount.*\$3,500/ })).toBeVisible();
  });

  test('added expense survives page reload', async ({ page }) => {
    // Add a new expense
    await page.getByText('Variable Expenses').locator('..').locator('..').getByText('Add').click();
    await page.getByPlaceholder('Name *').fill('Dog Food');
    await page.getByPlaceholder('$Amount *').fill('80');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Dog Food')).toBeVisible();

    // Reload and verify it persists
    await page.reload();
    await expect(page.getByText('Dog Food')).toBeVisible();
  });

  test('new goal survives page reload', async ({ page }) => {
    await page.getByRole('button', { name: /Goal Tracker/ }).click();
    await page.getByRole('button', { name: 'Add Goal' }).click();
    await page.getByPlaceholder('e.g. College Fund').fill('Vacation Fund');
    await page.getByPlaceholder('e.g. 100000').fill('15000');
    await page.getByPlaceholder('e.g. 5000').fill('0');
    await page.getByPlaceholder('e.g. 500').fill('500');
    await page.getByPlaceholder('e.g. 5.5').fill('4');
    await page.getByRole('button', { name: 'Add Goal' }).last().click();
    await expect(page.getByText('Vacation Fund')).toBeVisible();

    await page.reload();
    await page.getByRole('button', { name: /Goal Tracker/ }).click();
    await expect(page.getByText('Vacation Fund')).toBeVisible();
  });

  test('deleted goal does not reappear after reload', async ({ page }) => {
    await page.getByRole('button', { name: /Goal Tracker/ }).click();
    await page.getByRole('button', { name: /Delete goal: Home Down Payment/ }).click();
    await expect(page.getByText('Home Down Payment (20%)')).not.toBeVisible();

    await page.reload();
    await page.getByRole('button', { name: /Goal Tracker/ }).click();
    await expect(page.getByText('Home Down Payment (20%)')).not.toBeVisible();
  });
});
