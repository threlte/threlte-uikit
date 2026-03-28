<script lang="ts">
  import { Slider } from '@pmndrs/uikit-horizon'
  import type { SliderProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events.js'

  type Props = SliderProperties & {
    ref?: Slider
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Slider(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)

  // Threlte 8 calls registered handlers directly rather than via Object3D.dispatchEvent,
  // so the Slider's internal abortableEffect listeners never fire on their own.
  // We bridge the gap by forwarding events via dispatchEvent so the built-in
  // drag logic (worldToLocal value calculation, uncontrolledSignal, onValueChange) works.
  function forward(type: string, event: any) {
    component.dispatchEvent({
      type,
      pointerId: event.nativeEvent.pointerId,
      point: event.point,
      stopPropagation: event.stopPropagation,
    } as any)
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
