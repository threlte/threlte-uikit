<script lang="ts">
  import type { AccordionProperties } from '@pmndrs/uikit-default'
  import type { Snippet } from 'svelte'

  import { Accordion } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<AccordionProperties>, EventHandlers {
    ref?: Accordion
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Accordion(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
