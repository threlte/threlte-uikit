<script lang="ts">
  import type { BaseOutProperties, InProperties } from '@pmndrs/uikit'
  import type { Snippet } from 'svelte'

  import { CardHeader } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props
    extends WithoutUikitHandlers<InProperties<BaseOutProperties>>, EventHandlers {
    ref?: CardHeader
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new CardHeader(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
