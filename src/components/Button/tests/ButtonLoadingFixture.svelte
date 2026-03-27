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

<Button loading>
	{#snippet loadingIndicator()}
		<span data-testid="custom-loading">L</span>
	{/snippet}
	<span data-testid="button-child">Submit</span>
</Button>
