<script lang="ts">
	import clsx from 'clsx';

	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let size: 'xl' | 'lg' | 'md' | 'sm' = 'lg';
	let className: string = '';
	export { className as class };
</script>

<svelte:element
	this={tag}
	class={clsx(
		'font-bold leading-tight tracking-tight  text-slate-300',
		size === 'xl' && 'text-7xl md:text-9xl',
		size === 'lg' && 'text-6xl md:text-8xl',
		size === 'md' && 'text-5xl md:text-6xl',
		size === 'sm' && 'text-3xl md:text-4xl',
		className
	)}
>
	<slot />
</svelte:element>
