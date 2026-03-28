<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Content as VanillaContent, type ContentProperties } from '@pmndrs/uikit'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'

  type Props = ContentProperties & {
    ref?: VanillaContent
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new VanillaContent(undefined, undefined, { renderContext })
  ref = component

  const { handlers } = build(component, () => rest)
</script>

<T is={component} {...handlers.current}>
  {@render children?.()}
</T>
