<script lang="ts">
  import { Label } from '@pmndrs/uikit-default'
  import type { LabelProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'
  import type { Snippet } from 'svelte'

  interface Props extends WithoutUikitHandlers<LabelProperties>, EventHandlers {
    ref?: Label
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Label(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
