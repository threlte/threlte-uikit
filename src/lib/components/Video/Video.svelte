<script lang="ts">
  import Image from '../Image/Image.svelte'
  import { SRGBColorSpace, VideoTexture } from 'three'
  import { useThrelte } from '@threlte/core'
  import {
    setupVideoElementInvalidation,
    updateVideoElement,
  } from '@pmndrs/uikit/internals'
  import type { VideoProperties } from '@pmndrs/uikit/internals'
  import type { EventHandlers } from '$lib/Events'
  import type { ComponentInternals } from '$lib/useInternals'
  import type { Snippet } from 'svelte'
  import { signal } from '@preact/signals-core'

  type Props = VideoProperties & {
    ref?: ComponentInternals
    name?: string
    src: string | HTMLVideoElement
    element?: HTMLVideoElement
    children?: Snippet
  } & EventHandlers

  let {
    src,
    ref,
    autoplay,
    loop,
    muted,
    playbackRate,
    preservesPitch,
    volume,
    element = $bindable(
      src instanceof HTMLVideoElement ? src : document.createElement('video')
    ),
    children,
    ...rest
  }: Props = $props()

  const { invalidate } = useThrelte()

  const texture = signal<VideoTexture | undefined>()

  let aspectRatio = $state(1)

  const updateAspectRatio = () => {
    aspectRatio = element.videoWidth / element.videoHeight
  }

  $effect.pre(() => {
    setupVideoElementInvalidation(element, invalidate)
  })

  $effect.pre(() => {
    updateVideoElement(element, {
      src,
      autoplay,
      loop,
      muted,
      playbackRate,
      preservesPitch,
      volume,
    })
  })

  $effect.pre(() => {
    const videoTexture = new VideoTexture(element)
    videoTexture.colorSpace = SRGBColorSpace
    videoTexture.needsUpdate = true
    texture.value = videoTexture
    return () => videoTexture.dispose()
  })

  $effect(() => {
    updateAspectRatio()
    element.addEventListener('resize', updateAspectRatio)
    return () => element.removeEventListener('resize', updateAspectRatio)
  })
</script>

<Image
  bind:ref
  {aspectRatio}
  {...rest}
  src={texture}
>
  {@render children?.()}
</Image>
