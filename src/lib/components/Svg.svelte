<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Svg as VanillaSvg, type SvgProperties } from '@pmndrs/uikit'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events.js'

  type Props = SvgProperties & {
    ref?: VanillaSvg
    src: string
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new VanillaSvg(undefined, undefined, { renderContext })
  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
