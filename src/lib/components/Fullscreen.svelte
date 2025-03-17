<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Object3D, type PerspectiveCamera, type OrthographicCamera } from 'three'
  import { useThrelte, T } from '@threlte/core'
  import { batch, signal } from '@preact/signals-core'
  import {
    updateSizeFullscreen,
    type FullscreenProperties,
  } from '@pmndrs/uikit/internals'
  import Root from './Root.svelte'
  import type { ComponentInternals } from '$lib/useInternals'
  import type { EventHandlers } from '$lib/Events'

  type Props = FullscreenProperties & {
    ref?: ComponentInternals<FullscreenProperties>
    name?: string
    distanceToCamera?: number
    pixelSize?: number
    camera?: PerspectiveCamera | OrthographicCamera
    children?: Snippet
  } & EventHandlers

  let {
    ref = $bindable(),
    pixelSize,
    distanceToCamera,
    camera: userCamera,
    children,
    ...rest
  }: Props = $props()

  const { size, camera: defaultCamera } = useThrelte()

  const xSizeSignal = signal(1)
  const ySizeSignal = signal(1)
  const pixelSizeSignal = signal(1)

  $effect(() => {
    if (pixelSize !== undefined) {
      pixelSizeSignal.value = pixelSize
    }
  })

  const camera = $derived(userCamera ?? $defaultCamera)

  const distance = $derived(
    distanceToCamera ? distanceToCamera : (camera as PerspectiveCamera).near + 0.1
  )

  $effect(() => {
    batch(() =>
      updateSizeFullscreen(
        xSizeSignal,
        ySizeSignal,
        pixelSizeSignal,
        distance,
        camera,
        $size.height
      )
    )
  })

  const group = new Object3D()

  $effect(() => {
    camera.add(group)
    return () => camera.remove(group)
  })

  let p = $derived($pixelSizeSignal)
</script>

<T
  is={group}
  position.z={-distance}
  attach={false}
>
  <Root
    bind:ref
    {...rest}
    sizeX={xSizeSignal}
    sizeY={ySizeSignal}
    pixelSize={p}
  >
    {@render children?.()}
  </Root>
</T>
