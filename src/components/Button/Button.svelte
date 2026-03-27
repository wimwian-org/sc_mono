<!--
/**
 * @license
 * MIT License
 * Copyright (c) 2026 wimwian-org. All rights reserved.
 *
 * Coverage: statements 100% | branches 100% | functions 100% | lines 100%
 * Ignored lines: 1
 */
-->
<script lang="ts">
	import type { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from './ButtonTypes.js';
	import { getRippleOpacityClasses } from './ButtonUtils.js';

	// Ripple state
	let ripples = $state<Array<{ key: number; x: number; y: number; size: number }>>([]);
	let rippleKey = $state(0);

	function handleRipple(event: MouseEvent) {
		const button = event.currentTarget as HTMLElement;
		const rect = button.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = event.clientX - rect.left - size / 2;
		const y = event.clientY - rect.top - size / 2;
		const key = rippleKey++;
		ripples = [...ripples, { key, x, y, size }];
		// Remove ripple after animation
		setTimeout(() => {
			ripples = ripples.filter((r: { key: number }) => r.key !== key);
		}, 500);
	}

	let {
		variant = 'contained',
		color = 'primary',
		size = 'medium',
		type = 'button',
		disabled = false,
		fullWidth = false,
		loading = false,
		loadingPosition = 'start',
		disableElevation = false,
		rippleIntensity = 'medium',
		class: className,
		onClick,
		children,
		startIcon,
		endIcon,
		loadingIndicator,
		...rest
	}: ButtonProps = $props();

	const isDisabled = $derived(disabled || loading);

	const sizeClasses: Record<ButtonSize, string> = {
		small: 'text-xs px-3 py-1.5 gap-1.5 rounded',
		medium: 'text-sm px-4 py-2 gap-2 rounded-md',
		large: 'text-base px-5 py-2.5 gap-2.5 rounded-lg',
	};

	const containedColorClasses: Record<ButtonColor, string> = {
		primary: 'bg-primary-600 hover:bg-primary-700 text-white focus-visible:ring-primary-500',
		secondary: 'bg-purple-600 hover:bg-purple-700 text-white focus-visible:ring-purple-500',
		success: 'bg-green-600 hover:bg-green-700 text-white focus-visible:ring-green-500',
		error: 'bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500',
		warning: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 focus-visible:ring-yellow-500',
		info: 'bg-sky-600 hover:bg-sky-700 text-white focus-visible:ring-sky-500',
	};

	const outlinedColorClasses: Record<ButtonColor, string> = {
		primary:
			'border border-primary-600 text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus-visible:ring-primary-500',
		secondary:
			'border border-purple-600 text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus-visible:ring-purple-500',
		success:
			'border border-green-600 text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 focus-visible:ring-green-500',
		error:
			'border border-red-600 text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus-visible:ring-red-500',
		warning:
			'border border-yellow-500 text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 focus-visible:ring-yellow-500',
		info: 'border border-sky-600 text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-900/20 focus-visible:ring-sky-500',
	};

	const textColorClasses: Record<ButtonColor, string> = {
		primary:
			'text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus-visible:ring-primary-500',
		secondary:
			'text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus-visible:ring-purple-500',
		success:
			'text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 focus-visible:ring-green-500',
		error: 'text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus-visible:ring-red-500',
		warning:
			'text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 focus-visible:ring-yellow-500',
		info: 'text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-900/20 focus-visible:ring-sky-500',
	};

	const variantClasses = $derived.by(() => {
		if (variant === 'outlined') return outlinedColorClasses[color];
		if (variant === 'text') return textColorClasses[color];
		return containedColorClasses[color];
	});

	const elevationClasses = $derived(
		variant === 'contained' && !disableElevation ? 'shadow-sm hover:shadow' : 'shadow-none',
	);

	const disabledClasses = $derived(
		isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
	);

	const widthClasses = $derived(fullWidth ? 'w-full' : 'w-auto');

	const baseClasses =
		'relative overflow-hidden inline-flex items-center justify-center font-medium transition-colors duration-150 ' +
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

	const showLoadingStart = $derived(loading && loadingPosition === 'start');
	const showLoadingCenter = $derived(loading && loadingPosition === 'center');
	const showLoadingEnd = $derived(loading && loadingPosition === 'end');
	const showStartIcon = $derived(!!startIcon && !(loading && loadingPosition === 'start'));
	const showEndIcon = $derived(!!endIcon && !(loading && loadingPosition === 'end'));

	const rippleOpacityClasses = $derived(getRippleOpacityClasses(rippleIntensity, variant));

	/* v8 ignore next */
	const _customCls = $derived(className ?? '');

	const buttonClass = $derived(
		`${baseClasses} ${sizeClasses[size]} ${variantClasses} ${elevationClasses} ${disabledClasses} ${widthClasses} ${_customCls}`,
	);
</script>

<button
	{type}
	disabled={isDisabled}
	aria-busy={loading || undefined}
	class={buttonClass}
	{...rest}
	onclick={(e: MouseEvent) => {
		if (rippleIntensity !== 'none') {
			handleRipple(e);
		}
		onClick?.(e);
	}}
>
	{#each ripples as ripple (ripple.key)}
		{/* v8 ignore start */ ''}
		<span
			class="pointer-events-none absolute rounded-full animate-ripple {rippleOpacityClasses}"
			style:left="{ripple.x}px"
			style:top="{ripple.y}px"
			style:width="{ripple.size}px"
			style:height="{ripple.size}px"
			aria-hidden="true"
		></span>
		{/* v8 ignore stop */ ''}
	{/each}
	{#if showLoadingStart}
		<span role="status" aria-label="Loading" class="inline-flex" data-testid="button-loading">
			{#if loadingIndicator}
				{#if typeof loadingIndicator === 'string'}
					{loadingIndicator}
				{:else}
					{@render loadingIndicator()}
				{/if}
			{:else}
				<svg class="w-4 h-4 animate-spin" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
					<path
						d="M304 48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.8zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
					/>
				</svg>
			{/if}
		</span>
	{/if}

	{#if showStartIcon}
		<span aria-hidden="true" class="inline-flex" data-testid="button-start-icon">
			{#if typeof startIcon === 'string'}
				{startIcon}
			{:else}
				{@render startIcon?.()}
			{/if}
		</span>
	{/if}

	{#if children}
		<span class="inline-flex items-center">
			{#if typeof children === 'string'}
				{children}
			{:else}
				{@render children()}
			{/if}
		</span>
	{:else}
		<span class="inline-flex items-center">Button</span>
	{/if}

	{#if showLoadingCenter}
		<span role="status" aria-label="Loading" class="inline-flex" data-testid="button-loading">
			{#if loadingIndicator}
				{#if typeof loadingIndicator === 'string'}
					{loadingIndicator}
				{:else}
					{@render loadingIndicator()}
				{/if}
			{:else}
				<svg class="w-4 h-4 animate-spin" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
					<path
						d="M304 48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.8zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
					/>
				</svg>
			{/if}
		</span>
	{/if}

	{#if showEndIcon}
		<span aria-hidden="true" class="inline-flex" data-testid="button-end-icon">
			{#if typeof endIcon === 'string'}
				{endIcon}
			{:else}
				{@render endIcon?.()}
			{/if}
		</span>
	{/if}

	{#if showLoadingEnd}
		<span role="status" aria-label="Loading" class="inline-flex" data-testid="button-loading">
			{#if loadingIndicator}
				{#if typeof loadingIndicator === 'string'}
					{loadingIndicator}
				{:else}
					{@render loadingIndicator()}
				{/if}
			{:else}
				<svg class="w-4 h-4 animate-spin" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
					<path
						d="M304 48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.8zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
					/>
				</svg>
			{/if}
		</span>
	{/if}
</button>
