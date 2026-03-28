<script lang="ts">
  import { HorizonInput as HorizonInputVanilla } from '@pmndrs/uikit-horizon'
  import type { InputProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events.js'

  type HorizonInputProperties = InputProperties

  type Props = HorizonInputProperties & {
    ref?: InstanceType<typeof HorizonInputVanilla>
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new HorizonInputVanilla(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)

  function forwardClick(event: any) {
    component.dispatchEvent({
      type: 'click',
      stopPropagation: event.stopPropagation,
    } as any)
  }
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
  onclick={(event) => forwardClick(event)}
/>
