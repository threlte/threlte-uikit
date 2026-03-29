<script lang="ts">
  import { AccordionTrigger } from '@pmndrs/uikit-default'
  import type { InProperties, BaseOutProperties } from '@pmndrs/uikit'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'
  import type { Snippet } from 'svelte'

  interface Props
    extends WithoutUikitHandlers<InProperties<BaseOutProperties>>, EventHandlers {
    ref?: AccordionTrigger
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new AccordionTrigger(undefined, undefined, {
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
