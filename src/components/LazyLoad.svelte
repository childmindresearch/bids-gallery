<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

	export let loadThreshold = 0.1;
	let isVisible = false;
	let observer: IntersectionObserver;
	let element: HTMLElement;

	const handleIntersect: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				isVisible = true;
				observer.disconnect(); // Stop observing once the content is loaded
			}
		});
	};

	onMount(() => {
		observer = new IntersectionObserver(handleIntersect, {
			threshold: loadThreshold
		});
		observer.observe(element);
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<div class="lazy-load" bind:this={element}>
	{#if isVisible}
  <div transition:fade={{ duration: 500 }} >
    <slot /></div>
	{/if}
</div>

<style>
	.lazy-load {
		min-height: 100px; /* Placeholder height */
	}
</style>
