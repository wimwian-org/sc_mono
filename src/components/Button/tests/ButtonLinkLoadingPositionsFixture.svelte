<!--
/**
 * @license
 * MIT License
 * Copyright (c) 2026 wimwian-org. All rights reserved.
 *
 * Coverage: statements 100% | branches 100% | functions 100% | lines 100%
 * Ignored lines: 0
 */
-->
<script lang="ts">
	import { ButtonLink, type ButtonLoadingPosition } from '../index.js';

	let { loadingPosition = 'start' }: { loadingPosition?: ButtonLoadingPosition } = $props();
</script>

<ButtonLink href="#docs" loading {loadingPosition}>
	{#snippet startIcon()}
		<span data-testid="start-icon">S</span>
	{/snippet}
	{#snippet endIcon()}
		<span data-testid="end-icon">E</span>
	{/snippet}
	<span data-testid="button-link-child">Go</span>
</ButtonLink>
