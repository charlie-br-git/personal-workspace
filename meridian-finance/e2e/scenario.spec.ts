import { test, expect } from '@playwright/test';

test.describe('Scenario Comparison', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByRole('button', { name: /Scenario Comparison/ }).click();
  });

  test('shows both option cards', async ({ page }) => {
    await expect(page.getByText('Option A — Continue Renting')).toBeVisible();
    await expect(page.getByText('Option B — Purchase a Home')).toBeVisible();
  });

  test('shows adjust assumptions sliders', async ({ page }) => {
    await expect(page.getByText('Adjust Assumptions')).toBeVisible();
    await expect(page.getByRole('slider', { name: 'Home Price' })).toBeVisible();
    await expect(page.getByRole('slider', { name: 'Down Payment' })).toBeVisible();
    await expect(page.getByRole('slider', { name: 'Mortgage Rate' })).toBeVisible();
    await expect(page.getByRole('slider', { name: 'Home Appreciation' })).toBeVisible();
  });

  test('sliders are keyboard accessible', async ({ page }) => {
    const slider = page.getByRole('slider', { name: 'Mortgage Rate' });
    await slider.focus();
    const initialValue = await slider.inputValue();
    await page.keyboard.press('ArrowRight');
    const newValue = await slider.inputValue();
    expect(parseFloat(newValue)).toBeGreaterThan(parseFloat(initialValue));
  });

  test('horizon selector changes projection label', async ({ page }) => {
    await expect(page.getByText(/Year Wealth Projection/)).toBeVisible();
    await page.getByRole('button', { name: '20yr' }).click();
    await expect(page.getByText('20-Year Wealth Projection')).toBeVisible();
  });

  test('net worth delta updates when slider changes', async ({ page }) => {
    const deltaEl = page.locator('text=/Net Worth Delta/').locator('..');
    const before = await deltaEl.textContent();
    const slider = page.getByRole('slider', { name: 'Home Price' });
    await slider.focus();
    // Move slider significantly right (increase home price)
    for (let i = 0; i < 10; i++) await page.keyboard.press('ArrowRight');
    const after = await deltaEl.textContent();
    expect(after).not.toBe(before);
  });
});
