<script lang="ts">
  import { Group } from 'three'
  import { T } from '@threlte/core'
  import {
    createImageState,
    setupImage,
    type ImageProperties,
  } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals.svelte'
  import { useInternals, type ComponentInternals } from '$lib/useInternals'
  import AddHandlers from '../AddHandlers.svelte'
  import type { EventHandlers } from '$lib/Events'
  import type { Texture } from 'three'
  import type { Snippet } from 'svelte'

  type Props = Omit<ImageProperties, 'onClick'> & {
    ref?: ComponentInternals
    name?: string
    src?: string | Texture
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
    console.log(name, 2)
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
