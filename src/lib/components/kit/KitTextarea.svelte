<script lang="ts">
  import { Textarea as KitTextareaVanilla } from '@pmndrs/uikit-default'
  import type { TextareaProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'

  type KitTextareaProperties = TextareaProperties

  type Props = KitTextareaProperties & {
    ref?: KitTextareaVanilla
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new KitTextareaVanilla(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T bind:ref is={component} {...handlers.current} />
