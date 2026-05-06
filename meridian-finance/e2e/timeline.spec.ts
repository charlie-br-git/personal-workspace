import { test, expect } from '@playwright/test';

test.describe('Timeline Projection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByRole('button', { name: /Timeline Projection/ }).click();
  });

  test('shows projection controls and year-by-year table', async ({ page }) => {
    await expect(page.getByText('Projection Controls')).toBeVisible();
    await expect(page.getByText('Year-by-Year Breakdown')).toBeVisible();
    await expect(page.getByText('Starting Position')).toBeVisible();
  });

  test('shows all three scenario labels', async ({ page }) => {
    await expect(page.getByText('Conservative')).toBeVisible();
    await expect(page.getByText('Moderate')).toBeVisible();
    await expect(page.getByText('Optimistic')).toBeVisible();
  });

  test('savings rate slider is keyboard accessible', async ({ page }) => {
    const slider = page.getByRole('slider', { name: 'Monthly Savings Rate' });
    await slider.focus();
    const before = await slider.inputValue();
    await page.keyboard.press('ArrowRight');
    const after = await slider.inputValue();
    expect(parseInt(after)).toBeGreaterThan(parseInt(before));
  });

  test('horizon selector changes table rows', async ({ page }) => {
    // Default 10-year horizon: table has 6 rows (years 1,2,3,5,7,10)
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(6);

    await page.getByRole('button', { name: '5yr' }).click();
    // 5-year horizon: years 1,2,3,4,5 → 5 rows
    await expect(rows).toHaveCount(5);

    await page.getByRole('button', { name: '20yr' }).click();
    // 20-year horizon: years 1,3,5,10,15,20 → 6 rows
    await expect(rows).toHaveCount(6);
  });

  test('scenario yr-10 labels update with horizon', async ({ page }) => {
    await expect(page.getByText('Conservative (Yr 10)')).toBeVisible();
    await page.getByRole('button', { name: '25yr' }).click();
    await expect(page.getByText('Conservative (Yr 25)')).toBeVisible();
  });
});
