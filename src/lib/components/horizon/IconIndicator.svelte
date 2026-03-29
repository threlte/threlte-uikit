<script lang="ts">
  import { IconIndicator } from '@pmndrs/uikit-horizon'
  import type { IconIndicatorProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  interface Props extends WithoutUikitHandlers<IconIndicatorProperties>, EventHandlers {
    ref?: IconIndicator
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new IconIndicator(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
