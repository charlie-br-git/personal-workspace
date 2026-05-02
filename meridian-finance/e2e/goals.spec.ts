import { test, expect } from '@playwright/test';

test.describe('Goal Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByRole('button', { name: /Goal Tracker/ }).click();
  });

  test('shows three default goals', async ({ page }) => {
    await expect(page.getByText('6-Month Emergency Fund')).toBeVisible();
    await expect(page.getByText('Home Down Payment (20%)')).toBeVisible();
    await expect(page.getByText('Retirement at Age 60')).toBeVisible();
  });

  test('shows contribution sensitivity table', async ({ page }) => {
    await expect(page.getByText('Contribution Sensitivity')).toBeVisible();
    await expect(page.getByText('$500')).toBeVisible();
    await expect(page.getByText('$10,000')).toBeVisible();
  });

  test('can add a valid new goal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Goal' }).click();
    await page.getByPlaceholder('e.g. College Fund').fill('College Fund');
    await page.getByPlaceholder('e.g. 100000').fill('200000');
    await page.getByPlaceholder('e.g. 5000').fill('10000');
    await page.getByPlaceholder('e.g. 500').fill('1000');
    await page.getByPlaceholder('e.g. 5.5').fill('6');
    await page.getByRole('button', { name: 'Add Goal' }).last().click();
    await expect(page.getByText('College Fund')).toBeVisible();
  });

  test('shows validation error on empty name', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Goal' }).click();
    await page.getByPlaceholder('e.g. 100000').fill('100000');
    await page.getByRole('button', { name: 'Add Goal' }).last().click();
    await expect(page.getByText('Goal name is required.')).toBeVisible();
  });

  test('shows validation error when current exceeds target', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Goal' }).click();
    await page.getByPlaceholder('e.g. College Fund').fill('Test Goal');
    await page.getByPlaceholder('e.g. 100000').fill('50000');
    await page.getByPlaceholder('e.g. 5000').fill('60000');
    await page.getByRole('button', { name: 'Add Goal' }).last().click();
    await expect(page.getByText(/less than the target/)).toBeVisible();
  });

  test('can delete a goal', async ({ page }) => {
    await expect(page.getByText('Home Down Payment (20%)')).toBeVisible();
    await page.getByRole('button', { name: /Delete goal: Home Down Payment/ }).click();
    await expect(page.getByText('Home Down Payment (20%)')).not.toBeVisible();
  });

  test('clicking a goal card makes it active', async ({ page }) => {
    await page.getByRole('button', { name: /Select goal: Retirement at Age 60/ }).click();
    await expect(page.getByText('Retirement at Age 60').last()).toBeVisible();
  });

  test('export CSV triggers download', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /Export CSV/ }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('meridian-goals.csv');
  });
});
