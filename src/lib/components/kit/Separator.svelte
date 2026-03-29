<script lang="ts">
  import type { SeparatorProperties } from '@pmndrs/uikit-default'

  import { Separator } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<SeparatorProperties>, EventHandlers {
    ref?: Separator
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Separator(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
