<script lang="ts">
	import { page } from '$app/state';
	import { Button, ButtonLink } from '$lib/index.js';

	const component = $derived(page.params.component?.toLowerCase());

	// Playground state
	let variant = $state<'contained' | 'outlined' | 'text'>('contained');
	let color = $state<'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'>('primary');
	let size = $state<'small' | 'medium' | 'large'>('medium');
	let disabled = $state(false);
	let loading = $state(false);
	let fullWidth = $state(false);
	let disableElevation = $state(false);
	let rippleIntensity = $state<'low' | 'medium' | 'high' | 'none'>('medium');
	let children = $state('Playground Button');

	const generatedCode = $derived.by(() => {
		const props = [];
		if (variant !== 'contained') props.push(`variant="${variant}"`);
		if (color !== 'primary') props.push(`color="${color}"`);
		if (size !== 'medium') props.push(`size="${size}"`);
		if (disabled) props.push('disabled');
		if (loading) props.push('loading');
		if (fullWidth) props.push('fullWidth');
		if (disableElevation) props.push('disableElevation');
		if (rippleIntensity !== 'medium') props.push(`rippleIntensity="${rippleIntensity}"`);

		const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
		return `<Button${propsStr}>${children}</Button>`;
	});

	function copyCode() {
		navigator.clipboard.writeText(generatedCode);
	}
</script>

<div class="p-8 space-y-12 max-w-6xl mx-auto bg-white">
	{#if component === 'button'}
		<div class="space-y-2">
			<h1 class="text-4xl font-bold tracking-tight text-black">{component.toUpperCase()} Component</h1>
			<p class="text-secondary-600 text-lg">A highly customizable, high-fidelity button with built-in ripple effects and loading states.</p>
		</div>

		<!-- Interactive Playground -->
		<section class="space-y-6">
			<h2 class="text-2xl font-semibold border-b pb-2 text-black">Interactive Playground</h2>
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-6 rounded-2xl border border-gray-200">
				<!-- Preview Area -->
				<div class="lg:col-span-2 flex flex-col items-center justify-center min-h-[350px] bg-white rounded-xl border-2 border-dashed border-gray-100 p-8 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.01)]">
					<Button
						{variant}
						{color}
						{size}
						{disabled}
						{loading}
						{fullWidth}
						{disableElevation}
						{rippleIntensity}
					>
						{children}
					</Button>
				</div>

				<!-- Controls -->
				<div class="space-y-6 bg-white">
					<div class="space-y-4">
						<div class="flex flex-col gap-2">
							<label class="text-xs font-bold uppercase tracking-wider text-secondary-500" for="btn-variant">Variant</label>
							<select id="btn-variant" bind:value={variant} class="bg-white border-gray-200 border rounded px-3 py-2 text-sm text-black focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all">
								<option value="contained">Contained</option>
								<option value="outlined">Outlined</option>
								<option value="text">Text</option>
							</select>
						</div>

						<div class="flex flex-col gap-2">
							<label class="text-xs font-bold uppercase tracking-wider text-secondary-500" for="btn-color">Color</label>
							<select id="btn-color" bind:value={color} class="bg-white border-gray-200 border rounded px-3 py-2 text-sm text-black focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all">
								<option value="primary">Primary</option>
								<option value="secondary">Secondary</option>
								<option value="success">Success</option>
								<option value="error">Error</option>
								<option value="warning">Warning</option>
								<option value="info">Info</option>
							</select>
						</div>

						<div class="flex flex-col gap-2">
							<label class="text-xs font-bold uppercase tracking-wider text-secondary-500">Size</label>
							<div class="flex gap-2">
								{#each ['small', 'medium', 'large'] as s}
									<button
										onclick={() => size = s as any}
										class="flex-1 px-2 py-1.5 text-xs font-medium border border-gray-200 rounded transition-all {size === s ? 'bg-primary-600 text-white border-primary-600 shadow-sm' : 'bg-white text-black hover:border-gray-300'}"
									>
										{s.toUpperCase()}
									</button>
								{/each}
							</div>
						</div>

						<div class="flex flex-col gap-2">
							<label class="text-xs font-bold uppercase tracking-wider text-secondary-500" for="btn-ripple">Ripple Intensity</label>
							<select id="btn-ripple" bind:value={rippleIntensity} class="bg-white border-gray-200 border rounded px-3 py-2 text-sm text-black focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all">
								<option value="low">Low (20%)</option>
								<option value="medium">Medium (50%)</option>
								<option value="high">High (80%)</option>
								<option value="none">None</option>
							</select>
						</div>

						<div class="flex flex-col gap-3">
							<label class="text-xs font-bold uppercase tracking-wider text-secondary-500">States</label>
							<div class="grid grid-cols-2 gap-3">
								<label class="flex items-center gap-2 cursor-pointer text-sm text-black">
									<input type="checkbox" bind:checked={disabled} class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" /> 
									<span>Disabled</span>
								</label>
								<label class="flex items-center gap-2 cursor-pointer text-sm text-black">
									<input type="checkbox" bind:checked={loading} class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" /> 
									<span>Loading</span>
								</label>
								<label class="flex items-center gap-2 cursor-pointer text-sm text-black">
									<input type="checkbox" bind:checked={fullWidth} class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" /> 
									<span>Full Width</span>
								</label>
								<label class="flex items-center gap-2 cursor-pointer text-sm text-black">
									<input type="checkbox" bind:checked={disableElevation} class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" /> 
									<span>No Elevation</span>
								</label>
							</div>
						</div>
						
						<div class="flex flex-col gap-2">
							<label class="text-xs font-bold uppercase tracking-wider text-secondary-500" for="btn-text">Label Text</label>
							<input 
								id="btn-text" 
								type="text" 
								bind:value={children} 
								class="bg-white border-gray-200 border rounded px-3 py-2 text-sm text-black focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all w-full" 
								placeholder="Enter button text..."
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Code Snippet -->
			<div class="relative group">
				<div class="absolute -top-3 left-6 px-2 bg-white text-[10px] font-bold uppercase tracking-widest text-secondary-400 border border-gray-100 rounded">Generated Code</div>
				<pre class="bg-gray-900 text-gray-100 p-8 rounded-xl overflow-x-auto font-mono text-sm border border-gray-800 shadow-xl"><code>{generatedCode}</code></pre>
				<button 
					onclick={copyCode}
					class="absolute top-6 right-6 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-gray-700 shadow-lg group-hover:scale-105 active:scale-95"
				>
					Copy Snippet
				</button>
			</div>
		</section>

		<!-- Static Documentation -->
		<section class="space-y-12 pt-8">
			<h2 class="text-2xl font-semibold border-b pb-2 text-black">Reference Gallery</h2>
			
			<div class="space-y-6">
				<h3 class="text-lg font-bold text-secondary-800 uppercase tracking-tight">Variants</h3>
				<div class="flex gap-6 flex-wrap">
					<Button variant="contained">Contained</Button>
					<Button variant="outlined">Outlined</Button>
					<Button variant="text">Text</Button>
				</div>
			</div>

			<div class="space-y-6">
				<h3 class="text-lg font-bold text-secondary-800 uppercase tracking-tight">Theme Palette</h3>
				<div class="flex gap-6 flex-wrap">
					<Button color="primary">Primary</Button>
					<Button color="secondary">Secondary</Button>
					<Button color="success">Success</Button>
					<Button color="error">Error</Button>
					<Button color="warning">Warning</Button>
					<Button color="info">Info</Button>
				</div>
			</div>

			<div class="space-y-6">
				<h3 class="text-lg font-bold text-secondary-800 uppercase tracking-tight">Dynamic Ripples</h3>
				<div class="flex gap-10 items-center flex-wrap">
					<div class="flex flex-col items-center gap-3">
						<Button rippleIntensity="low" variant="outlined" color="secondary">Subtle</Button>
						<span class="text-[10px] font-bold font-mono text-secondary-400 uppercase tracking-widest">20% Intensity</span>
					</div>
					<div class="flex flex-col items-center gap-3">
						<Button rippleIntensity="medium" variant="outlined" color="primary">Default</Button>
						<span class="text-[10px] font-bold font-mono text-secondary-400 uppercase tracking-widest">50% Intensity</span>
					</div>
					<div class="flex flex-col items-center gap-3">
						<Button rippleIntensity="high" variant="outlined" color="error">Vivid</Button>
						<span class="text-[10px] font-bold font-mono text-secondary-400 uppercase tracking-widest">80% Intensity</span>
					</div>
				</div>
			</div>

			<div class="space-y-6">
				<h3 class="text-lg font-bold text-secondary-800 uppercase tracking-tight">States & Interaction</h3>
				<div class="flex gap-6 flex-wrap items-center">
					<Button disabled>Disabled</Button>
					<Button loading>Loading...</Button>
					<Button loading loadingPosition="center">Center</Button>
					<Button loading loadingPosition="end">End</Button>
				</div>
			</div>
		</section>
	{:else}
		<div class="flex flex-col items-center justify-center py-20 text-center">
			<h1 class="text-3xl font-bold text-red-600 mb-2">Component Not Found</h1>
			<p class="text-gray-500">The component gallery for "<strong>{page.params.component}</strong>" is currently under development.</p>
		</div>
	{/if}
</div>

<style>
	:global(html), :global(body) {
		background-color: #ffffff !important;
	}
</style>
