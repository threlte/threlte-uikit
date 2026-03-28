<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Object3D, type PerspectiveCamera, type OrthographicCamera } from 'three'
  import {
    Fullscreen as VanillaFullscreen,
    type FullscreenProperties,
  } from '@pmndrs/uikit'
  import { T, useThrelte } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'

  type Props = FullscreenProperties & {
    ref?: VanillaFullscreen
    camera?: PerspectiveCamera | OrthographicCamera
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), camera: userCamera, children, ...rest }: Props = $props()

  const { camera: defaultCamera, renderer } = useThrelte()
  const renderContext = useRenderContext()
  const component = new VanillaFullscreen(renderer, undefined, undefined, {
    renderContext,
  })
  const { handlers } = build(component, () => rest)

  const wrapper = new Object3D()
  const camera = $derived(userCamera ?? $defaultCamera)
</script>

<T
  is={wrapper}
  attach={camera}
>
  <T
    bind:ref
    is={component}
    {...handlers.current}
  >
    {@render children?.()}
  </T>
</T>
