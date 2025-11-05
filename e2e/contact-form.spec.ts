import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Check form fields are present
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/subject/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    await expect(page.getByLabel(/approximate budget/i)).toBeVisible();
    await expect(page.getByLabel(/project timeline/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check validation errors appear
    await expect(page.getByText(/name must be at least 2 characters/i)).toBeVisible();
    await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
    await expect(page.getByText(/subject must be at least 5 characters/i)).toBeVisible();
    await expect(page.getByText(/message must be at least 10 characters/i)).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Enter invalid email
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/name/i).click(); // Trigger blur
    
    // Check validation error
    await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
  });

  test('should validate name format', async ({ page }) => {
    // Enter invalid name with numbers
    await page.getByLabel(/full name/i).fill('John123');
    await page.getByLabel(/email/i).click(); // Trigger blur
    
    // Check validation error
    await expect(page.getByText(/name can only contain letters/i)).toBeVisible();
  });

  test('should show character count for message field', async ({ page }) => {
    // Type in message field
    await page.getByLabel(/message/i).fill('This is a test message');
    
    // Check character count is displayed
    await expect(page.getByText(/22\/1000 characters/i)).toBeVisible();
  });

  test('should enable submit button when form is valid', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /send message/i });
    
    // Button should be disabled initially
    await expect(submitButton).toBeDisabled();
    
    // Fill out required fields
    await page.getByLabel(/full name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/subject/i).fill('Test Subject');
    await page.getByLabel(/message/i).fill('This is a test message for the contact form');
    
    // Button should be enabled
    await expect(submitButton).toBeEnabled();
  });

  test('should handle form submission', async ({ page }) => {
    // Mock the form submission endpoint
    await page.route('https://formsubmit.co/datawithjose@outlook.com', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });
    
    // Fill out the form
    await page.getByLabel(/full name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/subject/i).fill('Test Subject');
    await page.getByLabel(/message/i).fill('This is a test message for the contact form');
    
    // Submit the form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check success message
    await expect(page.getByText(/message sent successfully/i)).toBeVisible();
  });

  test('should handle form submission error', async ({ page }) => {
    // Mock the form submission endpoint to return error
    await page.route('https://formsubmit.co/datawithjose@outlook.com', async route => {
      await route.abort('failed');
    });
    
    // Fill out the form
    await page.getByLabel(/full name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/subject/i).fill('Test Subject');
    await page.getByLabel(/message/i).fill('This is a test message for the contact form');
    
    // Submit the form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check error message
    await expect(page.getByText(/error sending message/i)).toBeVisible();
  });

  test('should show loading state during submission', async ({ page }) => {
    // Mock slow form submission
    await page.route('https://formsubmit.co/datawithjose@outlook.com', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });
    
    // Fill out the form
    await page.getByLabel(/full name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/subject/i).fill('Test Subject');
    await page.getByLabel(/message/i).fill('This is a test message for the contact form');
    
    // Submit the form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check loading state
    await expect(page.getByText(/sending message/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sending message/i })).toBeDisabled();
  });

  test('should work on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/contact');
    
    // Form should be responsive
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    
    // Fill out form on mobile
    await page.getByLabel(/full name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/subject/i).fill('Test Subject');
    await page.getByLabel(/message/i).fill('This is a test message');
    
    // Submit button should be enabled
    await expect(page.getByRole('button', { name: /send message/i })).toBeEnabled();
  });
});