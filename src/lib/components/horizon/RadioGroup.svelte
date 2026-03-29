<script lang="ts">
  import type { RadioGroupProperties } from '@pmndrs/uikit-horizon'
  import type { Snippet } from 'svelte'

  import { RadioGroup } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<RadioGroupProperties>, EventHandlers {
    ref?: RadioGroup
    children?: Snippet
    onvaluechange?: RadioGroupProperties['onValueChange']
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new RadioGroup(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
>
  {@render children?.()}
</T>
