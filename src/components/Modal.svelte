<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import NiiVue from './NiiVue.svelte';
  import { fade } from 'svelte/transition';
	import * as bidskeys from '$lib/bidskeys';

  export let image: any;
  export let show: boolean = false;

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal-overlay" on:click={closeModal} transition:fade={{ duration: 300 }}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-content" on:click|stopPropagation>
      <button class="close-button" on:click={closeModal} aria-label="Close modal">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <div class="modal-image">
        {#if image.src.endsWith('png')}
          <img src={image.src} alt={image.alt} />
        {:else if image.src.endsWith('mp4')}
          <!-- svelte-ignore a11y-media-has-caption -->
          <video controls>
            <source src={image.src} type="video/mp4" />
          </video>
        {:else if image.src.endsWith('nii.gz')}
          <NiiVue niftiPath={image.src} />
        {:else}
          <div class="unsupported-format">Unsupported file format</div>
        {/if}
      </div>
      <div class="modal-metadata card p-6">
        <h2 class="h2 mb-6 text-2xl font-bold">{image.caption}</h2>
        <div class="tags-container">
          {#each image.tags as tag}
            <div class="tag-item">
              <span class="tag-emoji">{bidskeys.ENTITY_TO_EMOJI[tag.key]}</span>
              <span class="tag-key">{bidskeys.ENTITY_TO_TAG[tag.key]}</span>
              <span class="tag-value">{tag.value}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 90%;
    max-width: 1200px;
    background-color: rgb(var(--color-surface-900));
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .modal-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: rgb(var(--color-surface-800));
  }

  .modal-image img,
  .modal-image video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .modal-metadata {
    background-color: rgb(var(--color-surface-700));
    color: rgb(var(--color-text-100));
    border-radius: 8px;
    overflow-y: auto;
  }

  .tags-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }

  .tag-item {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: rgb(var(--color-surface-600));
    border-radius: 6px;
    transition: background-color 0.2s ease;
  }

  .tag-item:hover {
    background-color: rgb(var(--color-surface-500));
  }

  .tag-emoji {
    font-size: 1.2em;
    margin-right: 8px;
  }

  .tag-key {
    font-weight: bold;
    margin-right: 8px;
  }

  .tag-value {
    color: rgb(var(--color-text-200));
  }

  .unsupported-format {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: rgb(var(--color-text-400));
    font-weight: bold;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: rgb(var(--color-text-100));
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(var(--color-surface-500), 0.5);
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  .close-button:hover {
    background-color: rgba(var(--color-surface-500), 0.8);
  }

  @media (min-width: 768px) {
    .modal-content {
      flex-direction: row;
    }

    .modal-image {
      flex: 2;
    }

    .modal-metadata {
      flex: 1;
      max-height: none;
      max-width: 300px;
    }
  }
</style>