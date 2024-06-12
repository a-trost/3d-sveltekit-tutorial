<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import Button from '$lib/components/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import Avatar from './Avatar.svelte';

	export let slice: Content.BiographySlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
		<Heading size="xl" class="col-start-1">
			{slice.primary.heading}
		</Heading>

		<div class="col-start-1 prose prose-invert prose-slate prose-xl">
			<PrismicRichText field={slice.primary.description} />
		</div>
		<Button linkField={slice.primary.button_link} label={slice.primary.button_label} />

		<Avatar image={slice.primary.avatar} class="row-start-1 max-w-sm md:col-start-2 md:row-end-3" />
	</div>
</Bounded>
