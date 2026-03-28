<script lang="ts">
  import { ButtonLabel } from '@pmndrs/uikit-horizon'
  import type { ButtonLabelProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events.js'
  import type { Snippet } from 'svelte'

  type Props = ButtonLabelProperties & {
    ref?: ButtonLabel
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new ButtonLabel(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
