<script lang="ts">
  import type { IconIndicatorProperties } from '@pmndrs/uikit-horizon'

  import { IconIndicator } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

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
