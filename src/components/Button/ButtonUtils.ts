/**
 * @license
 * MIT License
 * Copyright (c) 2026 wimwian-org. All rights reserved.
 */

import type { RippleIntensity, ButtonVariant } from './ButtonTypes.js';

/**
 * Returns the tailwind classes for ripple opacity based on intensity and button variant.
 * Using full string literals ensures Tailwind's JIT scanner picks up the classes.
 */
export function getRippleOpacityClasses(
	intensity: RippleIntensity = 'medium',
	variant: ButtonVariant = 'contained',
): string {
	if (intensity === 'none') return 'hidden';

	const isSolid = variant === 'contained';

	if (isSolid) {
		switch (intensity) {
			case 'low':
				return 'bg-white/20 dark:bg-white/10';
			case 'high':
				return 'bg-white/80 dark:bg-white/60';
			default:
				return 'bg-white/50 dark:bg-white/30';
		}
	} else {
		switch (intensity) {
			case 'low':
				return 'bg-current/20 dark:bg-current/10';
			case 'high':
				return 'bg-current/80 dark:bg-current/60';
			default:
				return 'bg-current/50 dark:bg-current/30';
		}
	}
}
