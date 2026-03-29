<script lang="ts">
  import { ButtonLabelSubtext } from '@pmndrs/uikit-horizon'
  import type { ButtonLabelSubtextProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'
  import type { Snippet } from 'svelte'

  interface Props
    extends WithoutUikitHandlers<ButtonLabelSubtextProperties>, EventHandlers {
    ref?: ButtonLabelSubtext
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new ButtonLabelSubtext(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
