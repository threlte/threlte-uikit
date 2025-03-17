<script lang="ts">
  import { Group } from 'three'
  import { T } from '@threlte/core'
  import {
    type ContentProperties,
    createContentState,
    setupContent,
  } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals.svelte'
  import { useInternals, type ComponentInternals } from '$lib/useInternals'
  import AddHandlers from '../AddHandlers.svelte'
  import type { EventHandlers } from '$lib/Events'
  import type { Snippet } from 'svelte'

  type Props = ContentProperties & {
    ref?: ComponentInternals
    name?: string
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), name, children, ...rest }: Props = $props()

  const parent = useParent()
  const { style, properties, defaults } = usePropertySignals<ContentProperties>(
    () => rest
  )

  const outerRef = new Group()
  const innerRef = new Group()

  const internals = createContentState(parent, style, properties, defaults, {
    current: innerRef,
  })
  createParent(undefined!)

  $effect(() => {
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
