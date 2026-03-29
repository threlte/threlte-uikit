<script lang="ts">
  import { Toggle } from '@pmndrs/uikit-horizon'
  import type { ToggleProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  interface Props extends WithoutUikitHandlers<ToggleProperties>, EventHandlers {
    ref?: Toggle
    oncheckedchange?: ToggleProperties['onCheckedChange']
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Toggle(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
