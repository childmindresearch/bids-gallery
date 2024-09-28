<script lang="ts">
	import { onMount } from 'svelte';
	import LazyLoad from '../components/LazyLoad.svelte';
  import * as bidskeys from '$lib/bidskeys';
	import NiiVue from '../components/NiiVue.svelte';

  const URL_JSON_B2T = "hbn_full.json";
	const URL_REPLACE = '';
	//const URL_BASE = 'https://fcp-indi.s3.amazonaws.com/data/Projects/HBN/NiftyOne/';
	const URL_BASE = 'https://fcp-indi.s3.amazonaws.com/data/Projects/HBN/MRI/';



  function format_bids_tag(b2t: any, entity: string, key: string) {
    const val = b2t?.[entity]?.[key];
    return val ? `${bidskeys.ENTITY_TO_EMOJI[entity]} ${val}` : null;
  }

	let images: any[] = [];
	onMount(async () => {
		const x = await fetch(URL_JSON_B2T);
		const b2t = await x.json();

		images = Object.keys(b2t[bidskeys.ENT_SUB]).map((key) => ({
			src: URL_BASE + b2t[bidskeys.FINFO_FILE_PATH][key].substring(URL_REPLACE.length),
			alt: b2t[bidskeys.ENT_SUB][key],
      tags: bidskeys.ALL_ENTITIES.map((entity) => format_bids_tag(b2t, entity, key)).filter((value) => value !== null),
      caption: b2t[bidskeys.ENT_DATATYPE][key] + " " + b2t[bidskeys.ENT_SUFFIX][key],
		}));
	});
</script>

<div class="container">
	<div class="gallery">
		{#each images as image}
			<div class="gallery-item">
				<LazyLoad>
					{#if image.src.endsWith('png')}
						<img src={image.src} alt={image.alt} />
					{:else if image.src.endsWith('mp4')}
						<!-- svelte-ignore a11y-media-has-caption -->
						<video controls>
							<source src={image.src} type="video/mp4" />
						</video>
          {:else if image.src.endsWith('nii.gz')}
            <NiiVue niftiPath={image.src} />
					{/if}
				  <div class="labelcaption">
            <span>{image.caption}</span>
          </div>
				  <div class="label">
            {#each image.tags as tag}
              <span>{tag}</span>
            {/each}
          </div>
				</LazyLoad>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 16px;
    box-sizing: border-box;
    max-width: none;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 16px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .gallery-item {
    position: relative;
    aspect-ratio: 1.618; /* Golden ratio :) */
    overflow: hidden;
    border-radius: 8px;
    background-color: #f0f0f022;
    transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transitions */
  }

  .gallery-item :nth-child(0) {
    width: 100%;
    height: 100%;
  }

  .gallery-item img, .gallery-item video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensure image/video covers the entire area */
    transform: translate(-50%, -50%); /* Center the media */
  }

  .gallery-item:hover {
  transform: scale(1.05); /* Slightly enlarge the item */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Add a soft shadow for highlighting */
}

  .gallery-item:hover .labelcaption,
  .gallery-item:hover .label {
    opacity: 0; /* Hide labels on hover */
    pointer-events: none; /* Make labels click-through */
  }

  .labelcaption {
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 14px;
    white-space: nowrap;
    font-weight: 600;
    transition: opacity 0.3s ease, pointer-events 0s ease; /* Smooth transition for opacity */
  }

  .labelcaption > span {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 4px;
    padding: 4px 8px;
    margin-right: 4px;
  }

  .label {
    position: absolute;
    bottom: 8px;
    left: 8px;
    font-size: 14px;
    white-space: nowrap;
    transition: opacity 0.3s ease, pointer-events 0s ease; /* Smooth transition for opacity */
  }

  .label > span {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 4px;
    padding: 4px 8px;
    margin-right: 4px;
  }

  @media (max-width: 768px) {
    .gallery {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Smaller min size on smaller screens */
    }
  }
</style>
