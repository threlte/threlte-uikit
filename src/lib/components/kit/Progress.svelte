<script lang="ts">
  import type { ProgressProperties } from '@pmndrs/uikit-default'

  import { Progress } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<ProgressProperties>, EventHandlers {
    ref?: Progress
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Progress(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
