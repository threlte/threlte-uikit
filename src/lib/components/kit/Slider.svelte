<script lang="ts">
  import { Slider } from '@pmndrs/uikit-default'
  import type { SliderProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'
  import type { Object3DEventMap } from 'three'

  interface Props extends WithoutUikitHandlers<SliderProperties>, EventHandlers {
    ref?: Slider
    onvaluechange?: SliderProperties['onValueChange']
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Slider(undefined, undefined, { renderContext })

  const { handlers, disableControls, enableControls } = build(component, () => rest)

  // Threlte 8 calls registered handlers directly rather than via Object3D.dispatchEvent,
  // so the Slider's internal abortableEffect listeners never fire on their own.
  // We bridge the gap by forwarding events via dispatchEvent so the built-in
  // drag logic (worldToLocal value calculation, uncontrolledSignal, onValueChange) works.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function forward(type: string, event: any) {
    if (type === 'pointerdown') disableControls()
    else if (type === 'pointerup') enableControls()
    component.dispatchEvent({
      type: type as keyof Object3DEventMap,
      pointerId: event.nativeEvent.pointerId,
      point: event.point,
      stopPropagation: event.stopPropagation,
    })
  }
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
  onpointerdown={(event) => forward('pointerdown', event)}
  onpointermove={(event) => forward('pointermove', event)}
  onpointerup={(event) => forward('pointerup', event)}
/>
