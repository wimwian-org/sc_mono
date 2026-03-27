/**
 * @license
 * MIT License
 * Copyright (c) 2026 wimwian-org. All rights reserved.
 *
 * Coverage: statements 100% | branches 100% | functions 100% | lines 100%
 * Ignored lines: 0
 */

import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonLoadingPosition = 'start' | 'center' | 'end';

export interface ButtonProps extends Omit<HTMLButtonAttributes, 'children'> {
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	type?: ButtonType;
	fullWidth?: boolean;
	loading?: boolean;
	loadingPosition?: ButtonLoadingPosition;
	disableElevation?: boolean;
	class?: string;
	onClick?: (event: MouseEvent) => void;
	children?: Snippet | string;
	startIcon?: Snippet | string;
	endIcon?: Snippet | string;
	loadingIndicator?: Snippet | string;
}
