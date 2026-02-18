import { expect, test } from '@playwright/test';

/**
 * End-to-end tests for the full Make It Exist user flow.
 * Tests the entire journey: land on page → navigate → fill form → submit.
 *
 * These tests run against a live dev server and verify the actual DOM.
 */

test.describe('Home Page — Loading & Navigation', () => {
  test('loads the home page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Make It Exist/);
  });

  test('hero section is visible with correct heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toContainText('Make It');
    await expect(heading).toContainText('Exist');
  });

  test('navbar is visible with logo text', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(nav).toContainText('Make It');
  });

  test('all main sections are present', async ({ page }) => {
    await page.goto('/');
    // Check for section IDs or key text
    await expect(page.locator('#services')).toBeAttached();
    await expect(page.locator('#how-it-works')).toBeAttached();
    await expect(page.locator('#schedule')).toBeAttached();
    await expect(page.locator('#about')).toBeAttached();
    await expect(page.locator('#request')).toBeAttached();
  });

  test('nav link scrolls to services section', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#services"]');
    // Give time for smooth scroll
    await page.waitForTimeout(800);
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeInViewport();
  });

  test('footer contains AIM reference', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText('Asian Institute of Management');
  });
});

test.describe('Services Section', () => {
  test('displays all 5 services', async ({ page }) => {
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();
    // Each service card has a title
    await expect(page.locator('#services').getByText('Websites')).toBeVisible();
    await expect(page.locator('#services').getByText('Mobile Apps')).toBeVisible();
    await expect(page.locator('#services').getByText('Web Applications')).toBeVisible();
    await expect(page.locator('#services').getByText('Custom LLM Solutions')).toBeVisible();
    await expect(page.locator('#services').getByText('Emerging Tech')).toBeVisible();
  });

  test('website service shows Free badge', async ({ page }) => {
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('#services').getByText('✦ Free')).toBeVisible();
  });
});

test.describe('Schedule Section', () => {
  test('shows the schedule with weekend day labels', async ({ page }) => {
    await page.goto('/');
    await page.locator('#schedule').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    // Should show Saturday and/or Sunday
    const section = page.locator('#schedule');
    const text = await section.textContent();
    expect(text).toMatch(/Saturday|Sunday/);
  });

  test('shows Available badge for time slots', async ({ page }) => {
    await page.goto('/');
    await page.locator('#schedule').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('#schedule').getByText('Available').first()).toBeVisible();
  });

  test('week navigation buttons work', async ({ page }) => {
    await page.goto('/');
    await page.locator('#schedule').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    // Click "next week" button
    const nextButton = page.locator('#schedule button[aria-label="Next week"]');
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(400);
      // The week indicator should change
      await expect(page.locator('#schedule').getByText('Week 2 of')).toBeVisible();
    }
  });
});

test.describe('Request Form — Full Flow', () => {
  test('form section is visible with progress bar', async ({ page }) => {
    await page.goto('/');
    await page.locator('#request').scrollIntoViewIfNeeded();
    await expect(page.locator('#request').getByText('Your Info')).toBeVisible();
    await expect(page.locator('#request').getByText('Project Details')).toBeVisible();
    await expect(page.locator('#request').getByText('Schedule')).toBeVisible();
  });

  test('Step 1: validates empty fields', async ({ page }) => {
    await page.goto('/');
    await page.locator('#request').scrollIntoViewIfNeeded();
    // Try to continue without filling anything
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();
    // Should see validation errors
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('Step 1: rejects non-AIM email', async ({ page }) => {
    await page.goto('/');
    await page.locator('#request').scrollIntoViewIfNeeded();
    await page.fill('#fullName', 'Test User');
    await page.fill('#aimEmail', 'test@gmail.com');
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText(/AIM email/i)).toBeVisible();
  });

  test('Step 1: accepts valid AIM email and advances', async ({ page }) => {
    await page.goto('/');
    await page.locator('#request').scrollIntoViewIfNeeded();
    await page.fill('#fullName', 'Juan Dela Cruz');
    await page.fill('#aimEmail', 'juan@aim.edu');
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();
    // Should advance to step 2 — the service type select should appear
    await expect(page.locator('#serviceType')).toBeVisible({ timeout: 5000 });
  });

  test('Step 2: validates empty fields', async ({ page }) => {
    await page.goto('/');
    await page.locator('#request').scrollIntoViewIfNeeded();

    // Complete step 1
    await page.fill('#fullName', 'Juan Dela Cruz');
    await page.fill('#aimEmail', 'juan@aim.edu');
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();
    await expect(page.locator('#serviceType')).toBeVisible({ timeout: 5000 });

    // Try to continue step 2 without filling
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText('Please select a service')).toBeVisible();
  });

  test('Step 2: validates short description', async ({ page }) => {
    await page.goto('/');
    await page.locator('#request').scrollIntoViewIfNeeded();

    // Complete step 1
    await page.fill('#fullName', 'Juan Dela Cruz');
    await page.fill('#aimEmail', 'juan@aim.edu');
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();
    await expect(page.locator('#serviceType')).toBeVisible({ timeout: 5000 });

    // Fill step 2 with short description
    await page.selectOption('#serviceType', 'website');
    await page.fill('#projectTitle', 'My Portfolio');
    await page.fill('#projectDescription', 'Short');
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText(/at least 20 characters/i)).toBeVisible();
  });

  test('Full flow: Step 1 → Step 2 → Step 3 → Submit', async ({ page }) => {
    await page.goto('/');
    await page.locator('#request').scrollIntoViewIfNeeded();

    // === STEP 1 ===
    await page.fill('#fullName', 'Juan Dela Cruz');
    await page.fill('#aimEmail', 'juan@aim.edu');
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();

    // === STEP 2 ===
    await expect(page.locator('#serviceType')).toBeVisible({ timeout: 5000 });
    await page.selectOption('#serviceType', 'website');
    await page.fill('#projectTitle', 'My Startup Landing Page');
    await page.fill(
      '#projectDescription',
      'I need a professional landing page for my fintech startup. It should feature a hero section, pricing table, and contact form.'
    );
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();

    // === STEP 3 ===
    // Wait for the weekend date buttons to appear
    await expect(page.getByText('Select a Weekend Date')).toBeVisible({ timeout: 5000 });

    // Click the first available weekend date
    const dateButtons = page.locator('#request button[type="button"]').filter({ hasText: /Saturday|Sunday/ });
    const count = await dateButtons.count();
    expect(count).toBeGreaterThan(0);
    await dateButtons.first().click();

    // Wait for time slots to appear and click the first one
    await expect(page.getByText('Select a Time Slot')).toBeVisible({ timeout: 5000 });
    const timeSlotButtons = page.locator('#request button[type="button"]').filter({ hasText: /AM|PM/ });
    const slotCount = await timeSlotButtons.count();
    expect(slotCount).toBeGreaterThan(0);
    await timeSlotButtons.first().click();

    // Submit
    await page.locator('#request').getByRole('button', { name: /Submit Request/i }).click();

    // Wait for success state
    await expect(page.getByText(/Request Submitted/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Submit Another Request/i)).toBeVisible();
  });

  test('Back button returns to previous step', async ({ page }) => {
    await page.goto('/');
    await page.locator('#request').scrollIntoViewIfNeeded();

    // Go to step 2
    await page.fill('#fullName', 'Test User');
    await page.fill('#aimEmail', 'test@aim.edu');
    await page.locator('#request').getByRole('button', { name: /Continue/i }).click();
    await expect(page.locator('#serviceType')).toBeVisible({ timeout: 5000 });

    // Go back
    await page.locator('#request').getByRole('button', { name: /Back/i }).click();
    // Should see step 1 fields with preserved data
    await expect(page.locator('#fullName')).toHaveValue('Test User');
    await expect(page.locator('#aimEmail')).toHaveValue('test@aim.edu');
  });
});

test.describe('Theme Toggle', () => {
  test('dark/light mode toggle works', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');

    // Find the theme toggle button
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeToggle).toBeVisible();

    // Get initial class
    const initialClass = await html.getAttribute('class');
    await themeToggle.click();
    await page.waitForTimeout(300);

    const newClass = await html.getAttribute('class');
    // The class should change (dark ↔ light)
    expect(newClass).not.toBe(initialClass);
  });
});

test.describe('Responsive Design', () => {
  test('mobile menu toggle works', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/');
    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await page.waitForTimeout(300);
    // Nav links should appear
    await expect(page.getByText('Services').first()).toBeVisible();
  });
});
