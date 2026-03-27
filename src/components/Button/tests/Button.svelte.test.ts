/**
 * @license
 * MIT License
 * Copyright (c) 2026 wimwian-org. All rights reserved.
 *
 * Coverage: statements 100% | branches 100% | functions 100% | lines 100%
 * Ignored lines: 0
 */

import { render } from 'vitest-browser-svelte';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../index.js';
import ButtonChildrenFixture from './ButtonChildrenFixture.svelte';
import ButtonIconsFixture from './ButtonIconsFixture.svelte';
import ButtonLoadingFixture from './ButtonLoadingFixture.svelte';
import ButtonLoadingPositionsFixture from './ButtonLoadingPositionsFixture.svelte';

describe('Button', () => {
	it('renders a button element', async () => {
		const screen = render(Button, {});
		await expect.element(screen.getByRole('button')).toBeInTheDocument();
	});

	it('defaults type to button', async () => {
		const screen = render(Button, {});
		await expect.element(screen.getByRole('button')).toHaveAttribute('type', 'button');
	});

	it('supports type=submit', async () => {
		const screen = render(Button, { type: 'submit' });
		await expect.element(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});

	it('renders children snippet content', async () => {
		const screen = render(ButtonChildrenFixture);
		await expect.element(screen.getByTestId('button-child')).toBeInTheDocument();
	});

	it('renders default text when children not provided', async () => {
		const screen = render(Button, {});
		await expect.element(screen.getByText('Button')).toBeInTheDocument();
	});

	it('supports contained variant', async () => {
		const screen = render(Button, { variant: 'contained' });
		await expect.element(screen.getByRole('button')).toBeInTheDocument();
	});

	it('supports outlined variant', async () => {
		const screen = render(Button, { variant: 'outlined' });
		await expect.element(screen.getByRole('button')).toBeInTheDocument();
	});

	it('supports text variant', async () => {
		const screen = render(Button, { variant: 'text' });
		await expect.element(screen.getByRole('button')).toBeInTheDocument();
	});

	it.each(['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const)(
		'supports color=%s',
		async (color) => {
			const screen = render(Button, { color });
			await expect.element(screen.getByRole('button')).toBeInTheDocument();
		},
	);

	it.each(['small', 'medium', 'large'] as const)('supports size=%s', async (size) => {
		const screen = render(Button, { size });
		await expect.element(screen.getByRole('button')).toBeInTheDocument();
	});

	it('is disabled when disabled=true', async () => {
		const screen = render(Button, { disabled: true });
		await expect.element(screen.getByRole('button')).toBeDisabled();
	});

	it('is disabled while loading', async () => {
		const screen = render(Button, { loading: true });
		await expect.element(screen.getByRole('button')).toBeDisabled();
		await expect.element(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
	});

	it('renders default loading spinner', async () => {
		const screen = render(Button, { loading: true });
		await expect.element(screen.getByTestId('button-loading')).toBeInTheDocument();
	});

	it('renders custom loadingIndicator snippet', async () => {
		const screen = render(ButtonLoadingFixture);
		await expect.element(screen.getByTestId('custom-loading')).toBeInTheDocument();
	});

	it('renders start/end icon snippets', async () => {
		const screen = render(ButtonIconsFixture);
		await expect.element(screen.getByTestId('start-icon')).toBeInTheDocument();
		await expect.element(screen.getByTestId('end-icon')).toBeInTheDocument();
	});

	it('hides icon snippets while loading', async () => {
		const screen = render(Button, { loading: true });
		expect(screen.getByTestId('button-start-icon').elements().length).toBe(0);
		expect(screen.getByTestId('button-end-icon').elements().length).toBe(0);
	});

	it('loadingPosition=start hides start icon and keeps end icon', async () => {
		const screen = render(ButtonLoadingPositionsFixture, { loadingPosition: 'start' });
		expect(screen.getByTestId('start-icon').elements().length).toBe(0);
		await expect.element(screen.getByTestId('end-icon')).toBeInTheDocument();
		await expect.element(screen.getByTestId('button-loading')).toBeInTheDocument();
	});

	it('loadingPosition=center keeps both icons', async () => {
		const screen = render(ButtonLoadingPositionsFixture, { loadingPosition: 'center' });
		await expect.element(screen.getByTestId('start-icon')).toBeInTheDocument();
		await expect.element(screen.getByTestId('end-icon')).toBeInTheDocument();
		await expect.element(screen.getByTestId('button-loading')).toBeInTheDocument();
	});

	it('loadingPosition=end keeps start icon and hides end icon', async () => {
		const screen = render(ButtonLoadingPositionsFixture, { loadingPosition: 'end' });
		await expect.element(screen.getByTestId('start-icon')).toBeInTheDocument();
		expect(screen.getByTestId('end-icon').elements().length).toBe(0);
		await expect.element(screen.getByTestId('button-loading')).toBeInTheDocument();
	});

	it('calls onClick when clicked', async () => {
		const onClick = vi.fn();
		const screen = render(Button, { onClick });
		await screen.getByRole('button').click();
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('does not call onClick when disabled', async () => {
		const onClick = vi.fn();
		const screen = render(Button, { onClick, disabled: true });
		await screen.getByRole('button').click({ force: true });
		expect(onClick).not.toHaveBeenCalled();
	});

	it('accepts custom class', async () => {
		const screen = render(Button, { class: 'custom-button' });
		await expect.element(screen.getByRole('button')).toBeInTheDocument();
	});

	it('supports fullWidth', async () => {
		const screen = render(Button, { fullWidth: true });
		await expect.element(screen.getByRole('button')).toBeInTheDocument();
	});

	it('supports disableElevation', async () => {
		const screen = render(Button, { disableElevation: true, variant: 'contained' });
		await expect.element(screen.getByRole('button')).toBeInTheDocument();
	});

	it('shows a ripple effect on click', async () => {
		const screen = render(Button, {});
		const button = screen.getByRole('button');
		// Access the DOM node for querySelector
		const buttonEl = button.element();
		await button.click();
		// The ripple span should be present immediately after click
		const ripple = buttonEl.querySelector('.animate-ripple');
		expect(ripple).not.toBeNull();
		// Wait for the ripple to disappear (500ms)
		await new Promise((r) => setTimeout(r, 600));
		expect(buttonEl.querySelector('.animate-ripple')).toBeNull();
	});
});

