<script lang="ts">
  import { Input as VanillaInput, type InputProperties } from '@pmndrs/uikit'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'

  type Props = InputProperties & {
    ref?: VanillaInput
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new VanillaInput(undefined, undefined, { renderContext })
  ref = component

  const { handlers } = build(component, () => rest)
</script>

<T is={component} {...handlers.current} />
