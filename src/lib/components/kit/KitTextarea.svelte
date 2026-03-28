<script lang="ts">
  import { Textarea as KitTextareaVanilla } from '@pmndrs/uikit-default'
  import type { TextareaProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events.js'

  type KitTextareaProperties = TextareaProperties

  type Props = KitTextareaProperties & {
    ref?: KitTextareaVanilla
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new KitTextareaVanilla(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)

  function forward(type: string, event: any) {
    component.input.dispatchEvent({
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
  onpointerleave={(event) => forward('pointerleave', event)}
  onpointercancel={(event) => forward('pointercancel', event)}
/>
