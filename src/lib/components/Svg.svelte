<script lang="ts">
  import type { Snippet } from 'svelte'

  import { type SvgProperties, Svg as VanillaSvg } from '@pmndrs/uikit'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<SvgProperties>, EventHandlers {
    ref?: VanillaSvg
    src: string
    children?: Snippet
  }

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
