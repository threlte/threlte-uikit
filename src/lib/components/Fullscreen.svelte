<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Object3D, type PerspectiveCamera, type OrthographicCamera } from 'three'
  import { useThrelte, T, useTask } from '@threlte/core'
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
    camera?: PerspectiveCamera | OrthographicCamera
    children?: Snippet
  } & EventHandlers

  let {
    ref = $bindable(),
    distanceToCamera,
    camera: userCamera,
    children,
    ...rest
  }: Props = $props()

  const { size, camera: defaultCamera } = useThrelte()

  const [sizeX, sizeY, pixelSize] = $derived.by(() => {
    const xSizeSignal = signal(1)
    const ySizeSignal = signal(1)
    const pixelSizeSignal = signal(1)

    updateSizeFullscreen(
      xSizeSignal,
      ySizeSignal,
      pixelSizeSignal,
      distance,
      camera,
      $size.height
    )

    return [xSizeSignal, ySizeSignal, pixelSizeSignal]
  })

  const camera = $derived(userCamera ?? $defaultCamera)

  const distance = $derived(
    distanceToCamera ? distanceToCamera : (camera as PerspectiveCamera).near + 0.1
  )

  useTask(() => {
    batch(() =>
      updateSizeFullscreen(sizeX, sizeY, pixelSize, distance, camera, $size.height)
    )
  })

  const group = new Object3D()

  let p = $derived($pixelSize)
</script>

<T
  is={group}
  position.z={-distance}
  attach={camera}
>
  <Root
    bind:ref
    {...rest}
    {sizeX}
    {sizeY}
    pixelSize={p}
  >
    {@render children?.()}
  </Root>
</T>
