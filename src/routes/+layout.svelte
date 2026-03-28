<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { CameraControls } from '@threlte/extras'

  let { children } = $props()
</script>

<div style="height: 100dvh">
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
