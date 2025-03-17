<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Group } from 'three'
  import { T } from '@threlte/core'
  import {
    type ContainerProperties,
    createContainerState,
    setupContainer,
  } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '../../useParent'
  import { usePropertySignals } from '../../usePropSignals.svelte'
  import { useInternals, type ComponentInternals } from '../../useInternals'
  import AddHandlers from '../AddHandlers.svelte'
  import type { EventHandlers } from '$lib/Events'

  type Props = ContainerProperties & {
    ref?: ComponentInternals
    name?: string
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), name, children, ...rest }: Props = $props()

  const parent = useParent()
  const { style, properties, defaults } = usePropertySignals<ContainerProperties>(
    () => rest
  )
  const outerRef = new Group()
  const innerRef = new Group()

  const internals = createContainerState(
    parent,
    { current: outerRef },
    style,
    properties,
    defaults
  )
  createParent(internals)

  $effect(() => {
    internals.interactionPanel.name = name ?? ''
  })

  $effect(() => {
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
</script>

<AddHandlers
  ref={outerRef}
  handlers={internals.handlers}
  userHandlers={rest}
>
  <T is={internals.interactionPanel} />
  <T
    is={innerRef}
    matrixAutoUpdate={false}
  >
    {@render children?.()}
  </T>
</AddHandlers>
