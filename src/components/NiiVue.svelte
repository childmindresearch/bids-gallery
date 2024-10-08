<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Niivue, MULTIPLANAR_TYPE } from "../../node_modules/@niivue/niivue/dist/";

  export let niftiPath: string = "";
  export let thumbnailPath: string = "";

  let nv: Niivue | null = null;
  let canvasContainer: HTMLDivElement;
  let isHovering = false;
  let resizeObserver: ResizeObserver | null = null

  function handleMouseEnter() {
    isHovering = true;
    createCanvas();
  }

  function handleMouseLeave() {
    isHovering = false;
    destroyCanvas();
  }

  function resizeListener(canvas: HTMLCanvasElement) {
    if (!nv) return;
    const {width, height} = canvas.parentElement?.getBoundingClientRect() || {width: 200, height: 200};
    canvas.width = width;
    canvas.height = height;
    nv.drawScene()
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

      // need to disable this to be able to dispose
      isResizeCanvas: false,
      isHighResolutionCapable: false,
    });

    nv.attachToCanvas(canvas);

    resizeObserver = new ResizeObserver(() => resizeListener(canvas));
    resizeObserver.observe(canvasContainer);
    
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
      nv = null;
    }
    while (canvasContainer.firstChild) {
      canvasContainer.removeChild(canvasContainer.firstChild);
    }
    canvasContainer.removeAttribute("style"); // for some reason niivue sets background-color to back here
  }

  onDestroy(() => {
    if (nv) {
      nv = null;
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
  bind:this={canvasContainer} 
  class="canvas-container"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  {#if !isHovering}
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={thumbnailPath} />
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
  .canvas-container img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensure image/video covers the entire area */
    transform: translate(-50%, -50%); /* Center the media */
  }
</style>