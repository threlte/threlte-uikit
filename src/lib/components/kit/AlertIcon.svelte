<script lang="ts">
  import { AlertIcon } from '@pmndrs/uikit-default'
  import type { AlertIconProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'
  import type { Snippet } from 'svelte'

  interface Props extends WithoutUikitHandlers<AlertIconProperties>, EventHandlers {
    ref?: AlertIcon
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new AlertIcon(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
