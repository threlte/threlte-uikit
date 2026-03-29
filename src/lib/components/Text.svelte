<script lang="ts">
  import { type TextProperties, Text as VanillaText } from '@pmndrs/uikit'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<TextProperties>, EventHandlers {
    ref?: VanillaText
    text: string
  }

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
