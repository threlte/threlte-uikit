<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Group, type Texture } from 'three'
  import { T } from '@threlte/core'
  import {
    createImageState,
    setupImage,
    type ImageProperties,
  } from '@pmndrs/uikit/internals'
  import type { Signal } from '@preact/signals-core'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals.svelte'
  import { useInternals, type ComponentInternals } from '$lib/useInternals'
  import type { EventHandlers } from '$lib/Events'
  import { createHandlers } from '$lib/createHandlers.svelte'

  type Props = Omit<ImageProperties, 'onClick'> & {
    ref?: ComponentInternals
    name?: string
    src?: string | Texture | Signal<Texture>
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), name, children, ...rest }: Props = $props()

  const parent = useParent()
  const outerRef = new Group()
  const innerRef = new Group()
  const { style, properties, defaults } = usePropertySignals<ImageProperties>(() => rest)

  const internals = createImageState(
    parent,
    { current: outerRef },
    style,
    properties,
    defaults
  )
  createParent(internals)

  ref = useInternals<ImageProperties>(
    parent.root.pixelSize,
    style,
    internals,
    internals.interactionPanel
  )

  $effect.pre(() => {
    const abortController = new AbortController()
    setupImage(
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

  $effect.pre(() => {
    internals.interactionPanel.name = name ?? ''
  })

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
