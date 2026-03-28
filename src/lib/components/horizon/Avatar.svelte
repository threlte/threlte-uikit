<script lang="ts">
  import { Avatar } from '@pmndrs/uikit-horizon'
  import type { AvatarProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events.js'

  type Props = AvatarProperties & {
    ref?: Avatar
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Avatar(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
