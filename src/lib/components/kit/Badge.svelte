<script lang="ts">
  import { Badge } from '@pmndrs/uikit-default'
  import type { BadgeProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'
  import type { Snippet } from 'svelte'

  interface Props extends WithoutUikitHandlers<BadgeProperties>, EventHandlers {
    ref?: Badge
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Badge(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
