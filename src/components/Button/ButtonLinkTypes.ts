/**
 * @license
 * MIT License
 * Copyright (c) 2026 wimwian-org. All rights reserved.
 *
 * Coverage: statements 100% | branches 100% | functions 100% | lines 100%
 * Ignored lines: 0
 */

import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import type { ButtonColor, ButtonSize, ButtonVariant } from './ButtonTypes.js';

export type ButtonLinkLoadingPosition = 'start' | 'center' | 'end';

export interface ButtonLinkProps extends HTMLAnchorAttributes {
	href: string;
	target?: '_self' | '_blank' | '_parent' | '_top';
	rel?: string;
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	disabled?: boolean;
	fullWidth?: boolean;
	loading?: boolean;
	loadingPosition?: ButtonLinkLoadingPosition;
	disableElevation?: boolean;
	class?: string;
	onClick?: (event: MouseEvent) => void;
	children?: Snippet;
	startIcon?: Snippet;
	endIcon?: Snippet;
	loadingIndicator?: Snippet;
}
