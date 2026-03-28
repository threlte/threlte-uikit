<script lang="ts">
  import { Text as VanillaText, type TextProperties } from '@pmndrs/uikit'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'

  type Props = TextProperties & {
    ref?: VanillaText
    text: string
  } & EventHandlers

  let { ref = $bindable(), text, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new VanillaText(undefined, undefined, { renderContext })
  const { handlers } = build(component, () => ({ ...rest, text }))
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
