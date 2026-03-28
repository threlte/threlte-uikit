<script lang="ts">
  import { Textarea as VanillaTextarea, type TextareaProperties } from '@pmndrs/uikit'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'

  type Props = TextareaProperties & {
    ref?: VanillaTextarea
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new VanillaTextarea(undefined, undefined, { renderContext })
  ref = component

  const { handlers } = build(component, () => rest)
</script>

<T is={component} {...handlers.current} />
