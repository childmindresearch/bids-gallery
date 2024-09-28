<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Niivue, MULTIPLANAR_TYPE } from "../../node_modules/@niivue/niivue/dist/";

  export let niftiPath: string = "";

  let nv: Niivue | null = null;
  let canvasContainer: HTMLDivElement;
  let isHovering = false;

  function handleMouseEnter() {
    isHovering = true;
    createCanvas();
  }

  function handleMouseLeave() {
    isHovering = false;
    destroyCanvas();
  }

  function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvasContainer.appendChild(canvas);

    nv = new Niivue({
      //crosshairColor: [1, 0, 0, 1],
      multiplanarLayout: MULTIPLANAR_TYPE.GRID,
      isNearestInterpolation: true,  // does this actually do something?
    });

    nv.attachToCanvas(canvas);

    if (niftiPath) {
      nv.loadVolumes([
        {
          url: niftiPath,
          colorMap: "gray",
          opacity: 1.0
        }
      ]);
    }
  }

  function destroyCanvas() {
    if (nv) {
      //nv.destroy();
      nv = null;
    }
    while (canvasContainer.firstChild) {
      canvasContainer.removeChild(canvasContainer.firstChild);
    }
    canvasContainer.removeAttribute("style"); // for some reason niivue sets background-color to back here
  }

  onDestroy(() => {
    if (nv) {
      //nv.destroy();
    }
  });
</script>

<div 
  bind:this={canvasContainer} 
  class="canvas-container"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  {#if !isHovering}
    <div class="hover-message">Hover to view</div>
  {/if}
</div>

<style>
  .canvas-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .hover-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: #888;
  }
</style>