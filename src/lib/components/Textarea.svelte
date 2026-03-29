<script lang="ts">
  import { type TextareaProperties, Textarea as VanillaTextarea } from '@pmndrs/uikit'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<TextareaProperties>, EventHandlers {
    ref?: VanillaTextarea
    onfocuschange?: TextareaProperties['onFocusChange']
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new VanillaTextarea(undefined, undefined, { renderContext })
  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
