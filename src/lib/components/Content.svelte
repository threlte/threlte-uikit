<script lang="ts">
  import type { Snippet } from 'svelte'

  import { type ContentProperties, Content as VanillaContent } from '@pmndrs/uikit'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<ContentProperties>, EventHandlers {
    ref?: VanillaContent
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new VanillaContent(undefined, undefined, { renderContext })
  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
