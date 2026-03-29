<script lang="ts">
  import type { RadioGroupItemProperties } from '@pmndrs/uikit-default'
  import type { Snippet } from 'svelte'

  import { RadioGroupItem } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<RadioGroupItemProperties>, EventHandlers {
    ref?: RadioGroupItem
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new RadioGroupItem(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
