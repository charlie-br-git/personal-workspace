import { test, expect } from '@playwright/test';

test.describe('Budget Snapshot', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage to start from known state
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('loads with header stats and expense rows', async ({ page }) => {
    await expect(page.getByText('Meridian')).toBeVisible();
    await expect(page.getByText('Gross Annual')).toBeVisible();
    await expect(page.getByText('Net Monthly')).toBeVisible();
    await expect(page.getByText('Cash Flow')).toBeVisible();
    await expect(page.getByText('Fixed Expenses')).toBeVisible();
    await expect(page.getByText('Variable Expenses')).toBeVisible();
  });

  test('income fields are editable and update header', async ({ page }) => {
    // Click the Gross Annual editable amount in the stat strip
    const grossAnnualEdit = page.getByRole('button', { name: /Edit amount.*\$410/ });
    await grossAnnualEdit.click();
    await page.keyboard.type('500000');
    await page.keyboard.press('Enter');
    await expect(page.getByText('$500,000')).toBeVisible();
  });

  test('can add a new fixed expense', async ({ page }) => {
    await page.getByText('Fixed Expenses').locator('..').locator('..').getByText('Add').click();
    await page.getByPlaceholder('Name *').fill('Gym Membership');
    await page.getByPlaceholder('$Amount *').fill('150');
    await page.getByPlaceholder('Category').fill('Health');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Gym Membership')).toBeVisible();
  });

  test('shows validation error on blank name', async ({ page }) => {
    await page.getByText('Fixed Expenses').locator('..').locator('..').getByText('Add').click();
    await page.getByPlaceholder('$Amount *').fill('100');
    await page.getByRole('button', { name: 'Add' }).last().click();
    await expect(page.getByText('Name is required.')).toBeVisible();
  });

  test('shows validation error on invalid amount', async ({ page }) => {
    await page.getByText('Fixed Expenses').locator('..').locator('..').getByText('Add').click();
    await page.getByPlaceholder('Name *').fill('Test');
    await page.getByPlaceholder('$Amount *').fill('-50');
    await page.getByRole('button', { name: 'Add' }).last().click();
    await expect(page.getByText(/valid amount/)).toBeVisible();
  });

  test('can edit an expense amount inline', async ({ page }) => {
    const rentEditBtn = page.getByRole('button', { name: /Edit amount.*\$2,950/ }).first();
    await rentEditBtn.click();
    await page.keyboard.selectAll();
    await page.keyboard.type('3200');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: /Edit amount.*\$3,200/ })).toBeVisible();
  });

  test('export CSV triggers download', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /Export CSV/ }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('meridian-budget.csv');
  });
});
