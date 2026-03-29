<script lang="ts">
  import { ToggleGroupItem } from '@pmndrs/uikit-default'
  import type { ToggleGroupItemProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'
  import type { Snippet } from 'svelte'

  interface Props extends WithoutUikitHandlers<ToggleGroupItemProperties>, EventHandlers {
    ref?: ToggleGroupItem
    children?: Snippet
    oncheckedchange?: ToggleGroupItemProperties['onCheckedChange']
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new ToggleGroupItem(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
