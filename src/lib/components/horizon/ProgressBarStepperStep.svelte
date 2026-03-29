<script lang="ts">
  import { ProgressBarStepperStep } from '@pmndrs/uikit-horizon'
  import type { ProgressBarStepperStepProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  interface Props
    extends WithoutUikitHandlers<ProgressBarStepperStepProperties>, EventHandlers {
    ref?: ProgressBarStepperStep
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new ProgressBarStepperStep(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
