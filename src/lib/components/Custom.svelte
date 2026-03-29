<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Custom as VanillaCustom, type CustomProperties } from '@pmndrs/uikit'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  interface Props extends WithoutUikitHandlers<CustomProperties>, EventHandlers {
    ref?: VanillaCustom
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new VanillaCustom(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
