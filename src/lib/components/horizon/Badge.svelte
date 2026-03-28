<script lang="ts">
  import { Badge } from '@pmndrs/uikit-horizon'
  import type { BadgeProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events.js'

  type Props = BadgeProperties & {
    ref?: Badge
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Badge(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
