<script lang="ts">
  import { Dropdown } from '@pmndrs/uikit-horizon'
  import type { DropdownProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'
  import type { Snippet } from 'svelte'

  interface Props extends WithoutUikitHandlers<DropdownProperties>, EventHandlers {
    ref?: Dropdown
    children?: Snippet
    onvaluechange?: DropdownProperties['onValueChange']
    onopenchange?: DropdownProperties['onOpenChange']
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Dropdown(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)

  function forwardClick(event: any) {
    component.dispatchEvent({
      type: 'click',
      stopPropagation: event.stopPropagation,
    } as any)
  }
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
  onclick={(event) => forwardClick(event)}
>
  {@render children?.()}
</T>
