<script lang="ts">
  import { T } from '@threlte/core'
  import { CameraControls, interactivity } from '@threlte/extras'

  let { children } = $props()

  interactivity()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 15]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  <CameraControls />
</T.PerspectiveCamera>

{@render children?.()}
