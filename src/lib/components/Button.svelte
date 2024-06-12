<script lang="ts">
	import { type KeyTextField, type LinkField } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';

	import IconArrow from '~icons/ic/baseline-arrow-outward';

	export let linkField: LinkField;
	export let label: KeyTextField;
	export let showIcon: boolean = true;
	let className: string = '';
	export { className as class };
</script>

<PrismicLink
	field={linkField}
	class={`group text-slate-900 relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform eas-out hover:scale-105 ${className}`}
>
	<span
		class={`absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-9`}
	></span>

	<span class="relative flex items-center justify-center gap-2"
		>{label}
		{#if showIcon}
			<IconArrow />
		{/if}
	</span>
</PrismicLink>
