import { expect, test } from '@playwright/test';

test('Button Gallery page renders correctly (case-insensitive)', async ({ page }) => {
	// Try mixed case
	await page.goto('/live/Button');
	await expect(page.getByRole('heading', { name: /button gallery/i })).toBeVisible();

	// Check for variant buttons
	await expect(page.getByRole('button', { name: 'Contained' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Outlined' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Text' })).toBeVisible();

	// Try lowercase
	await page.goto('/live/button');
	await expect(page.getByRole('heading', { name: /button gallery/i })).toBeVisible();

	// Check for color buttons
	await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Secondary' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Success' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Error' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Warning' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Info' })).toBeVisible();

	// Check for states
	await expect(page.getByRole('button', { name: 'Disabled' })).toBeDisabled();
	await expect(page.getByRole('button', { name: 'Loading' })).toBeDisabled();
	await expect(page.getByRole('button', { name: 'Loading' }).locator('svg')).toBeVisible();

	// Check for links
	await expect(page.getByRole('link', { name: 'Link Contained' })).toHaveAttribute('href', '#contained');
	await expect(page.getByRole('link', { name: 'Link Outlined' })).toHaveAttribute('href', '#outlined');
});

test('Button interaction', async ({ page }) => {
	await page.goto('/live/Button');

	const primaryButton = page.getByRole('button', { name: 'Primary' });
	await primaryButton.click();
	
	// Ensure it didn't crash or navigate incorrectly
	await expect(page).toHaveURL('/live/Button');
});
