<script lang="ts">
  import type { CheckboxProperties } from '@pmndrs/uikit-default'

  import { Checkbox } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

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
