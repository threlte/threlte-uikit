<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Object3D } from 'three'
  import { T } from '@threlte/core'
  import {
    type ContentProperties,
    createContentState,
    setupContent,
  } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals.svelte'
  import { useInternals, type ComponentInternals } from '$lib/useInternals'
  import { createHandlers } from '$lib/createHandlers.svelte'
  import type { EventHandlers } from '$lib/Events'

  type Props = ContentProperties & {
    ref?: ComponentInternals<ContentProperties>
    name?: string
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), name, children, ...rest }: Props = $props()

  const parent = useParent()
  const outerRef = new Object3D()
  const innerRef = new Object3D()
  const { style, properties, defaults } = usePropertySignals<ContentProperties>(
    () => rest
  )

  const internals = createContentState(parent, style, properties, defaults, {
    current: innerRef,
  })
  createParent(undefined!)

  $effect.pre(() => {
    internals.interactionPanel.name = name ?? ''
  })

  $effect(() => {
    const abortController = new AbortController()
    setupContent(
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

  ref = useInternals<ContentProperties>(
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
