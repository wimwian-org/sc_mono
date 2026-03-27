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
	import { Button } from '../index.js';
</script>

<Button>
	{#snippet startIcon()}
		<span data-testid="start-icon">S</span>
	{/snippet}
	{#snippet endIcon()}
		<span data-testid="end-icon">E</span>
	{/snippet}
	<span data-testid="button-child">Action</span>
</Button>
