<script lang="ts">
  import { AlertDescription } from '@pmndrs/uikit-default'
  import type { InProperties, BaseOutProperties } from '@pmndrs/uikit'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'
  import type { Snippet } from 'svelte'

  type Props = InProperties<BaseOutProperties> & {
    ref?: AlertDescription
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new AlertDescription(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T bind:ref is={component} {...handlers.current}>
  {@render children?.()}
</T>
