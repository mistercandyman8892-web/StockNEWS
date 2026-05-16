import { test, expect } from '@playwright/test';

test('verify full app flow', async ({ page }) => {
  // Go to the app
  await page.goto('http://localhost:3000');

  // Wait for initial load
  await expect(page.locator('h1')).toContainText('Market Intelligence, Simplified.');
  await page.screenshot({ path: 'static/onboarding_1.png' });

  // Onboarding Step 2
  // Using a more specific locator to avoid dev tools button
  await page.locator('main button').first().click();
  await expect(page.locator('h1')).toContainText('Your Portfolio, Protected.');
  await page.screenshot({ path: 'static/onboarding_2.png' });

  // Onboarding Step 3
  await page.locator('main button').first().click();
  await expect(page.locator('h1')).toContainText('Speed is Wealth.');
  await page.screenshot({ path: 'static/onboarding_3.png' });

  // Goal Selection
  await page.locator('main button').first().click();
  await expect(page.locator('h1')).toContainText('Define Your Focus');
  await page.locator('text=Long-term Wealth').click();
  await page.screenshot({ path: 'static/goal_selection.png' });
  await page.locator('button:has-text("Next Step")').click();

  // Asset Selection
  await expect(page.locator('h1')).toContainText('Your Portfolio');
  await page.locator('text=AAPL').click();
  await page.locator('text=NVDA').click();
  await page.screenshot({ path: 'static/asset_selection.png' });
  await page.locator('text=Start My Briefing').click();

  // Dashboard
  await expect(page.locator('h1')).toContainText('Jameson');
  await expect(page.locator('h2')).toContainText('$');
  await page.screenshot({ path: 'static/dashboard.png' });

  // Start Stories
  await page.locator('text=Daily Briefing').click();
  await page.waitForTimeout(1000); // Wait for transition
  await page.screenshot({ path: 'static/story_feed.png' });

  // Verify impact badge exists
  await expect(page.locator('text=Impact')).toBeVisible();
});
