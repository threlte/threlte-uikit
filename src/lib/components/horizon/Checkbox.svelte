<script lang="ts">
  import { Checkbox } from '@pmndrs/uikit-horizon'
  import type { CheckboxProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  interface Props extends WithoutUikitHandlers<CheckboxProperties>, EventHandlers {
    ref?: Checkbox
    oncheckedchange?: CheckboxProperties['onCheckedChange']
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Checkbox(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
