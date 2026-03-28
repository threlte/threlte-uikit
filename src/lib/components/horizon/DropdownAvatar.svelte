<script lang="ts">
  import { DropdownAvatar } from '@pmndrs/uikit-horizon'
  import type { DropdownAvatarProperties } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'
  import { build, useRenderContext } from '$lib/build.svelte'
  import type { EventHandlers } from '$lib/Events.js'

  type Props = DropdownAvatarProperties & {
    ref?: DropdownAvatar
  } & EventHandlers

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new DropdownAvatar(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  {...handlers.current}
/>
