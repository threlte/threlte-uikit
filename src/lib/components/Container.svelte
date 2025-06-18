<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Object3D } from 'three'
  import { T } from '@threlte/core'
  import {
    type ContainerProperties,
    createContainerState,
    setupContainer,
  } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals.svelte'
  import { useInternals, type ComponentInternals } from '$lib/useInternals'
  import type { EventHandlers } from '$lib/Events'
  import { createHandlers } from '$lib/createHandlers.svelte'

  type Props = ContainerProperties & {
    ref?: ComponentInternals<ContainerProperties>
    name?: string
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), name, children, ...rest }: Props = $props()

  const parent = useParent()
  const outerRef = new Object3D()
  const innerRef = new Object3D()
  const { style, properties, defaults } = usePropertySignals<ContainerProperties>(
    () => rest
  )

  const internals = createContainerState(
    parent,
    { current: outerRef },
    style,
    properties,
    defaults
  )
  createParent(internals)

  $effect.pre(() => {
    internals.interactionPanel.name = name ?? ''
  })

  $effect.pre(() => {
    const abortController = new AbortController()
    setupContainer(
      internals,
      parent,
      style,
      properties,
      outerRef,
      innerRef,
      abortController.signal
    )
    return () => abortController.abort()
  })

  ref = useInternals<ContainerProperties>(
    parent.root.pixelSize,
    style,
    internals,
    internals.interactionPanel
  )

  const allHandlers = createHandlers(internals.handlers, () => rest)
</script>

<T
  is={outerRef}
  matrixAutoUpdate={false}
  {...allHandlers.current}
>
  <T is={internals.interactionPanel} />
  <T
    is={innerRef}
    matrixAutoUpdate={false}
  >
    {@render children?.()}
  </T>
</T>
