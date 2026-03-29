<script lang="ts">
  import { Input as KitInputVanilla } from '@pmndrs/uikit-default'
  import type { InputProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  type KitInputProperties = InputProperties

  interface Props extends WithoutUikitHandlers<KitInputProperties>, EventHandlers {
    ref?: KitInputVanilla
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new KitInputVanilla(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
