<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.RichTextSlice;
</script>

<div class="max-w-prose">
	<PrismicRichText field={slice.primary.content} />
</div>
