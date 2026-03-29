<script lang="ts">
  import type { AccordionContentProperties } from '@pmndrs/uikit-default'
  import type { Snippet } from 'svelte'

  import { AccordionContent } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props
    extends WithoutUikitHandlers<AccordionContentProperties>, EventHandlers {
    ref?: AccordionContent
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new AccordionContent(undefined, undefined, {
    renderContext,
    defaultOverrides: {},
  })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
