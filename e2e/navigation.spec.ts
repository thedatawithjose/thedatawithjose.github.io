import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate through main pages', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    
    // Check homepage loads
    await expect(page.getByRole('heading', { name: /building/i })).toBeVisible();
    
    // Navigate to About page
    await page.getByRole('link', { name: /about me/i }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: /about me/i })).toBeVisible();
    
    // Navigate to Services page
    await page.getByRole('link', { name: /services/i }).click();
    await expect(page).toHaveURL('/services');
    await expect(page.getByRole('heading', { name: /services/i })).toBeVisible();
    
    // Navigate to Portfolio page
    await page.getByRole('link', { name: /portfolio/i }).click();
    await expect(page).toHaveURL('/portfolio');
    await expect(page.getByRole('heading', { name: /portfolio/i })).toBeVisible();
    
    // Navigate to Blog page
    await page.getByRole('link', { name: /blog/i }).click();
    await expect(page).toHaveURL('/blog');
    await expect(page.getByRole('heading', { name: /blog/i })).toBeVisible();
    
    // Navigate to Contact page
    await page.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { name: /contact/i })).toBeVisible();
  });

  test('should handle mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Mobile menu should be hidden initially
    await expect(page.getByRole('link', { name: /about me/i })).not.toBeVisible();
    
    // Click hamburger menu
    await page.getByRole('button', { name: /toggle menu/i }).click();
    
    // Mobile menu should be visible
    await expect(page.getByRole('link', { name: /about me/i })).toBeVisible();
    
    // Navigate using mobile menu
    await page.getByRole('link', { name: /about me/i }).click();
    await expect(page).toHaveURL('/about');
  });

  test('should have working social links', async ({ page }) => {
    await page.goto('/');
    
    // Check LinkedIn link
    const linkedinLink = page.getByRole('link', { name: /linkedin/i });
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/datawithjose');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    
    // Check Instagram link
    const instagramLink = page.getByRole('link', { name: /instagram/i });
    await expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/datawithjose');
    await expect(instagramLink).toHaveAttribute('target', '_blank');
    
    // Check GitHub link
    const githubLink = page.getByRole('link', { name: /github/i });
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/thedatawithjose');
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });
});