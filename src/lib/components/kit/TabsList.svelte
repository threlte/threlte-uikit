<script lang="ts">
  import { TabsList } from '@pmndrs/uikit-default'
  import type { TabsListProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'
  import type { Snippet } from 'svelte'

  type Props = TabsListProperties & {
    ref?: TabsList
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new TabsList(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T bind:ref is={component} {...handlers.current}>
  {@render children?.()}
</T>
