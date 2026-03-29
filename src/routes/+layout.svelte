<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { CameraControls } from '@threlte/extras'
  import { isDarkMode } from '@pmndrs/uikit'
  import { fromStore } from 'svelte/store'

  let { children } = $props()

  const _dark = fromStore(isDarkMode)
  const dark = $derived(_dark.current)
  const canvasBg = $derived(dark ? '#111111' : '#f0f0f0')
</script>

<div style="height: 100dvh; background: {canvasBg}">
  <Canvas>
    {@render children()}

    <T.PerspectiveCamera
      makeDefault
      position={[5, 5, 15]}
      oncreate={(ref) => ref.lookAt(0, 0, 0)}
    >
      <CameraControls />
    </T.PerspectiveCamera>
  </Canvas>
</div>
