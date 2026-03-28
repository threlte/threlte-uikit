<script lang="ts">
  import { TabsTrigger } from '@pmndrs/uikit-default'
  import type { TabsTriggerProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'
  import type { Snippet } from 'svelte'

  type Props = TabsTriggerProperties & {
    ref?: TabsTrigger
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new TabsTrigger(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T bind:ref is={component} {...handlers.current}>
  {@render children?.()}
</T>
