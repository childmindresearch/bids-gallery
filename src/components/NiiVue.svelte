<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Niivue, MULTIPLANAR_TYPE, SHOW_RENDER } from "../../node_modules/@niivue/niivue/dist/";


  export let niftiPath: string = "";

  let nv: Niivue | null = null;
  let canvasContainer: HTMLDivElement;
  let resizeObserver: ResizeObserver | null = null;

  function resizeListener(canvas: HTMLCanvasElement) {
    if (!nv) return;
    const {width, height} = canvas.parentElement?.getBoundingClientRect() || {width: 200, height: 200};
    canvas.width = width;
    canvas.height = height;
    nv.drawScene();
  }

  function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvasContainer.appendChild(canvas);

    nv = new Niivue({
      multiplanarLayout: MULTIPLANAR_TYPE.GRID,
      isNearestInterpolation: true,
      isResizeCanvas: false,
      isHighResolutionCapable: false,
      backColor: [0, 0, 0, 1],
    });
    nv.onLocationChange = (l) => handleLocationChange(l);

    nv.attachToCanvas(canvas);
    nv.setRadiologicalConvention(false);
    nv.graph.autoSizeMultiplanar = true;
    nv.opts.multiplanarShowRender = SHOW_RENDER.ALWAYS;
    nv.graph.opacity = 1.0;
    nv.graph.normalizeValues = true;

    resizeObserver = new ResizeObserver(() => resizeListener(canvas));
    resizeObserver.observe(canvasContainer);
    
    if (niftiPath) {
      nv.loadVolumes([
        {
          url: niftiPath,
          colorMap: "gray",
          opacity: 1.0,
        }
      ]);
    }
  }

  function handleLocationChange(data: any) {
    console.log(data.string);
  }

  onMount(() => {
    createCanvas();
  });

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

<div bind:this={canvasContainer} class="canvas-container"></div>

<style>
  .canvas-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>