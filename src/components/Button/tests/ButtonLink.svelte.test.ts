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
import { ButtonLink } from '../index.js';
import ButtonLinkChildrenFixture from './ButtonLinkChildrenFixture.svelte';
import ButtonLinkIconsFixture from './ButtonLinkIconsFixture.svelte';
import ButtonLinkLoadingFixture from './ButtonLinkLoadingFixture.svelte';
import ButtonLinkLoadingPositionsFixture from './ButtonLinkLoadingPositionsFixture.svelte';

describe('ButtonLink', () => {
	it('renders anchor link', async () => {
		const screen = render(ButtonLink, { href: '#docs' });
		await expect.element(screen.getByRole('link')).toBeInTheDocument();
	});

	it('uses provided href', async () => {
		const screen = render(ButtonLink, { href: '#docs' });
		await expect.element(screen.getByRole('link')).toHaveAttribute('href', '#docs');
	});

	it('defaults rel for target=_blank', async () => {
		const screen = render(ButtonLink, { props: { href: '#docs', target: '_blank' } });
		await expect.element(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('is aria-disabled when disabled', async () => {
		const screen = render(ButtonLink, { href: '#docs', disabled: true });
		const text = screen.getByText('Button link').element() as HTMLSpanElement;
		const anchor = text.parentElement as HTMLAnchorElement;
		expect(anchor.getAttribute('aria-disabled')).toBe('true');
	});

	it('calls onClick when enabled', async () => {
		const onClick = vi.fn();
		const screen = render(ButtonLink, { href: '#docs', onClick });
		const anchor = screen.getByRole('link').element() as HTMLAnchorElement;
		anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('does not call onClick when disabled', async () => {
		const onClick = vi.fn();
		const screen = render(ButtonLink, { href: '#docs', onClick, disabled: true });
		const text = screen.getByText('Button link').element() as HTMLSpanElement;
		const anchor = text.parentElement as HTMLAnchorElement;
		anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
		expect(onClick).not.toHaveBeenCalled();
	});

	it('renders children snippet content', async () => {
		const screen = render(ButtonLinkChildrenFixture);
		await expect.element(screen.getByTestId('button-link-child')).toBeInTheDocument();
	});

	it('renders default loading spinner', async () => {
		const screen = render(ButtonLink, { href: '#docs', loading: true });
		await expect.element(screen.getByTestId('button-link-loading')).toBeInTheDocument();
	});

	it('renders custom loadingIndicator snippet', async () => {
		const screen = render(ButtonLinkLoadingFixture);
		await expect.element(screen.getByTestId('custom-loading')).toBeInTheDocument();
	});

	it('renders start/end icon snippets', async () => {
		const screen = render(ButtonLinkIconsFixture);
		await expect.element(screen.getByTestId('start-icon')).toBeInTheDocument();
		await expect.element(screen.getByTestId('end-icon')).toBeInTheDocument();
	});

	it('loadingPosition=start hides start icon and keeps end icon', async () => {
		const screen = render(ButtonLinkLoadingPositionsFixture, { loadingPosition: 'start' });
		expect(screen.getByTestId('start-icon').elements().length).toBe(0);
		await expect.element(screen.getByTestId('end-icon')).toBeInTheDocument();
		await expect.element(screen.getByTestId('button-link-loading')).toBeInTheDocument();
	});

	it('loadingPosition=center keeps both icons', async () => {
		const screen = render(ButtonLinkLoadingPositionsFixture, { loadingPosition: 'center' });
		await expect.element(screen.getByTestId('start-icon')).toBeInTheDocument();
		await expect.element(screen.getByTestId('end-icon')).toBeInTheDocument();
		await expect.element(screen.getByTestId('button-link-loading')).toBeInTheDocument();
	});

	it('loadingPosition=end keeps start icon and hides end icon', async () => {
		const screen = render(ButtonLinkLoadingPositionsFixture, { loadingPosition: 'end' });
		await expect.element(screen.getByTestId('start-icon')).toBeInTheDocument();
		expect(screen.getByTestId('end-icon').elements().length).toBe(0);
		await expect.element(screen.getByTestId('button-link-loading')).toBeInTheDocument();
	});

	it('supports variant=outlined', async () => {
		const screen = render(ButtonLink, { href: '#docs', variant: 'outlined' });
		await expect.element(screen.getByRole('link')).toBeInTheDocument();
	});

	it('supports variant=text', async () => {
		const screen = render(ButtonLink, { href: '#docs', variant: 'text' });
		await expect.element(screen.getByRole('link')).toBeInTheDocument();
	});

	it('supports fullWidth', async () => {
		const screen = render(ButtonLink, { href: '#docs', fullWidth: true });
		await expect.element(screen.getByRole('link')).toBeInTheDocument();
	});

	it('accepts custom class', async () => {
		const screen = render(ButtonLink, { href: '#docs', class: 'custom-btn-link' });
		await expect.element(screen.getByRole('link')).toBeInTheDocument();
	});
});
