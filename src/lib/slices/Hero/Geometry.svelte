<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import { Float, createTransition } from '@threlte/extras';
	import * as THREE from 'three';
	import gsap from 'gsap';
	import { elasticOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let position: [number, number, number] = [0, 0, 0];
	export let geometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(3);
	export let rate = 0.5;

	const soundeEffects = [
		new Audio('/sounds/hit1.ogg'),
		new Audio('/sounds/hit2.ogg'),
		new Audio('/sounds/hit3.ogg')
	];

	let visible = false;
	let reducedMotionRate = 0;

	const materialParams = [
		{ color: 0x2ecc71, roughness: 0 },
		{ color: 0xf1c40f, roughness: 0.4 },
		{ color: 0xe74c3c, roughness: 0.1 },
		{ color: 0x8e44ad, roughness: 0.1 },
		{ color: 0x1abc9c, roughness: 0.1 },
		{ color: 0x2980b9, roughness: 0, metalness: 0.5 },
		{ color: 0x2c3e50, roughness: 0.1, metalness: 0.5 }
	];

	function getRandomMaterial() {
		const randomInt = gsap.utils.random(1, 10, 1);
		if (randomInt === 1) {
			return new THREE.MeshNormalMaterial();
		}
		return new THREE.MeshStandardMaterial(gsap.utils.random(materialParams));
	}

	function handleClick(event: MouseEvent) {
		gsap.utils.random(soundeEffects).play();
		if ('object' in event && event.object instanceof THREE.Mesh) {
			gsap.to(event.object.rotation, {
				x: `+=${gsap.utils.random(0, 3)}`,
				y: `+=${gsap.utils.random(0, 3)}`,
				z: `+=${gsap.utils.random(0, 3)}`,
				duration: 1.3,
				ease: 'elastic.out(1,0.3)',
				yoyo: true
			});

			event.object.material = getRandomMaterial();
		}
	}

	const bounce = createTransition((ref) => {
		return {
			tick(t) {
				if (t > 0) visible = true;
				ref.scale.set(t, t, t);
			},
			easing: elasticOut,
			duration: gsap.utils.random(800, 1200),
			delay: gsap.utils.random(0, 500)
		};
	});

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		reducedMotionRate = prefersReducedMotion ? 0 : 1;
	});

	$: compoundRate = rate * reducedMotionRate;
</script>

<Threlte.Group position={position.map((p) => p * 2)}>
	<Float
		speed={5 * compoundRate}
		rotationSpeed={5 * compoundRate}
		rotationIntensity={6 * compoundRate}
		floatIntensity={5 * compoundRate}
	>
		<Threlte.Mesh
			{visible}
			{geometry}
			in={bounce}
			material={getRandomMaterial()}
			interactive
			on:click={handleClick}
		></Threlte.Mesh>
	</Float>
</Threlte.Group>
