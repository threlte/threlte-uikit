<script lang="ts">
  import { Checkbox } from '@pmndrs/uikit-default'
  import type { CheckboxProperties } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events'

  type Props = CheckboxProperties & {
    ref?: Checkbox
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Checkbox(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T bind:ref is={component} {...handlers.current} />
