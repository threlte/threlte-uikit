<script lang="ts">
  import type { Svg, SvgProperties } from '@pmndrs/uikit'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type IconConstructor = new (...args: any[]) => Svg

  interface Props extends WithoutUikitHandlers<SvgProperties>, EventHandlers {
    is: IconConstructor
    ref?: Svg
  }

  let { is: IconClass, ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = $derived(new IconClass(undefined, undefined, { renderContext }))

  const { handlers } = $derived(build(component, () => rest))
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
