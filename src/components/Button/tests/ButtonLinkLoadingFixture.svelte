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
	import { ButtonLink } from '../index.js';
</script>

<ButtonLink href="#docs" loading>
	{#snippet loadingIndicator()}
		<span data-testid="custom-loading">L</span>
	{/snippet}
	<span data-testid="button-link-child">Submit</span>
</ButtonLink>
