<script lang="ts">
  import { DropdownList } from '@pmndrs/uikit-horizon'
  import type { DropdownListProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events.js'
  import type { Snippet } from 'svelte'

  interface Props extends DropdownListProperties, EventHandlers {
    ref?: DropdownList
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new DropdownList(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
