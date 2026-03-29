<script lang="ts">
  import { InputField } from '@pmndrs/uikit-horizon'
  import type { InputFieldProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  interface Props extends WithoutUikitHandlers<InputFieldProperties>, EventHandlers {
    ref?: InputField
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new InputField(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)

  function forwardClick(event: any) {
    component.dispatchEvent({
      type: 'click',
      stopPropagation: event.stopPropagation,
    } as any)
  }

  function forwardPointer(type: string, event: any) {
    component.input.input.dispatchEvent({
      type,
      pointerId: event.nativeEvent.pointerId,
      point: event.point,
      uv: event.uv,
      object: event.object,
      nativeEvent: event.nativeEvent,
      stopPropagation: event.stopPropagation,
    } as any)
  }
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
  onclick={(event) => forwardClick(event)}
  onpointerdown={(event) => forwardPointer('pointerdown', event)}
  onpointermove={(event) => forwardPointer('pointermove', event)}
  onpointerup={(event) => forwardPointer('pointerup', event)}
  onpointerleave={(event) => forwardPointer('pointerleave', event)}
  onpointercancel={(event) => forwardPointer('pointercancel', event)}
/>
