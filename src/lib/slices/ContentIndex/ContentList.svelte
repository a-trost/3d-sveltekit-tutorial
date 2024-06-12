<script lang="ts">
	import {
		asImageSrc,
		isFilled,
		type Content,
		type ImageField,
		type KeyTextField
	} from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import { gsap } from 'gsap';
	import type { Action } from 'svelte/action';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import IconArrow from '~icons/ic/baseline-arrow-outward';

	gsap.registerPlugin(ScrollTrigger);

	export let items: Content.BlogpostDocument[] | Content.ProjectDocument[];
	export let fallbackItemImage: ImageField;
	export let viewMoreText: KeyTextField = 'Read More';

	let lastMousePos = { x: 0, y: 0 };
	let currentIndex: number | undefined;

	$: contentImages = items.map((item) => {
		const image = isFilled.image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage;
		return asImageSrc(image, {
			fit: 'crop',
			w: 220,
			h: 320,
			exp: -10
		});
	});

	const onItemEnter: Action<HTMLElement, number> = (node, index) => {
		gsap.fromTo(
			node,
			{
				opacity: 0,
				y: 20
			},
			{
				opacity: 1,
				y: 0,
				duration: 1.3,
				ease: 'elastic.out(1,0.3)',
				stagger: 0.2,
				scrollTrigger: {
					trigger: node,
					start: 'top bottom-=200px',
					end: 'bottom center',
					toggleActions: 'play none none none'
				}
			}
		);

		const imageUrl = contentImages[index];
		if (imageUrl) {
			const img = new Image();
			img.src = imageUrl;
		}

		return {
			destroy() {}
		};
	};

	const handleMouseMove = (e: MouseEvent) => {
		const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };

		const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.x, 2));

		const maxY = window.scrollY + window.innerHeight - 350;
		const maxX = window.innerWidth - 250;

		gsap.to('.hover-reveal', {
			x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
			y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
			rotation: speed * (mousePos.x > lastMousePos.x ? 1 : -1),
			ease: 'back.out(2)',
			duration: 1.3
		});

		gsap.to('.hover-reveal', {
			opacity: currentIndex === undefined ? 0 : 1,
			visibility: 'visible',
			ease: 'power3.out',
			duration: 0.6
		});

		lastMousePos = mousePos;
	};

	const onMouseEnter = (index: number) => {
		currentIndex = index;
	};

	const onMouseLeave = () => {
		currentIndex = undefined;
	};
</script>

<svelte:window on:mousemove={handleMouseMove} />

<ul on:mouseleave={onMouseLeave} class="grid border-b border-b-slate-100">
	{#each items as post, index (post.id + index)}
		<li
			on:mouseenter={() => onMouseEnter(index)}
			class="content-list-item opacity-0"
			use:onItemEnter={index}
		>
			<PrismicLink
				document={post}
				class="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
			>
				<div class="flex flex-col">
					<span class="text-3xl font-bold">{post.data.title}</span>
					<div class="flex gap-3 text-yellow-400">
						{#each post.tags as tag}
							<span class="text-lg font-bold">
								{tag}
							</span>
						{/each}
					</div>
				</div>
				<span class="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
					{viewMoreText}
					<IconArrow />
				</span>
			</PrismicLink>
		</li>
	{/each}
</ul>

<!-- Hover element -->
<div
	class="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
	style={currentIndex === undefined ? '' : `background-image: url(${contentImages[currentIndex]})`}
></div>
