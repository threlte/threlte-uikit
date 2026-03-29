<script lang="ts">
  import { Canvas } from '@threlte/core'

  import { isDarkMode } from '$lib/isDarkMode.js'

  import Scene from './Scene.svelte'

  let { children } = $props()

  const canvasBg = $derived(isDarkMode.current ? '#111111' : '#f0f0f0')
</script>

<div style="height: 100dvh; background: {canvasBg}">
  <Canvas>
    <Scene>
      {@render children()}
    </Scene>
  </Canvas>
</div>
