import { test, expect } from '@playwright/test';

test('verify full app flow with themes and login', async ({ page }) => {
  // Go to the app
  await page.goto('http://localhost:3000');

  // Login Screen
  await expect(page.locator('h1')).toContainText('FinStory');
  await page.screenshot({ path: 'static/login_screen.png' });
  await page.locator('button:has-text("Continue with Google")').click();

  // Onboarding Step 1
  await expect(page.locator('h1')).toContainText('Market Intelligence, Simplified.');
  await page.screenshot({ path: 'static/onboarding_light.png' });

  // Toggle Theme to Dark
  // Assuming the toggle is in Dashboard, but let's check if we can toggle early if it were globally available.
  // Actually, ThemeToggle is currently only in Dashboard. Let's get to Dashboard first.

  // Skip Onboarding
  for (let i = 0; i < 3; i++) {
    await page.locator('main button').first().click();
  }

  // Goal Selection
  await page.locator('text=Long-term Wealth').click();
  await page.locator('button:has-text("Next Step")').click();

  // Asset Selection
  await page.locator('text=AAPL').click();
  await page.locator('button:has-text("Start My Briefing")').click();

  // Dashboard
  await expect(page.locator('h1')).toContainText('Trader');
  await page.screenshot({ path: 'static/dashboard_redesign.png' });

  // Test Theme Toggle
  await page.locator('button[aria-label="Toggle Theme"]').click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'static/dashboard_dark.png' });

  // Start Stories
  await page.locator('text=Start Daily Briefing').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'static/story_feed_live.png' });
});
