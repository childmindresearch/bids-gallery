<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">BIDS Gallery</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://childmind.org/"
					target="_blank"
					rel="noreferrer"
				>
					Child Mind
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://fcon_1000.projects.nitrc.org/indi/cmi_healthy_brain_network/"
					target="_blank"
					rel="noreferrer"
				>
					HBN
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/childmindresearch/bids-gallery"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
