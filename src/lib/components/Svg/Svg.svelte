<script lang="ts">
  import { Object3D } from 'three'
  import { T } from '@threlte/core'
  import { type SvgProperties, createSvgState, setupSvg } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals.svelte'
  import { useInternals, type ComponentInternals } from '$lib/useInternals'
  import AddHandlers from '../AddHandlers.svelte'
  import type { EventHandlers } from '$lib/Events'
  import type { Snippet } from 'svelte'

  type Props = SvgProperties & {
    ref?: ComponentInternals
    name?: string
    src: string
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), name, children, ...rest }: Props = $props()

  const parent = useParent()
  const outerRef = new Object3D()
  const innerRef = new Object3D()
  const { style, properties, defaults } = usePropertySignals<SvgProperties>(() => rest)

  const internals = createSvgState(
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
    setupSvg(
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

  ref = useInternals(parent.root.pixelSize, style, internals, internals.interactionPanel)
</script>

<AddHandlers
  ref={outerRef}
  handlers={internals.handlers}
  userHandlers={rest}
>
  <T is={internals.interactionPanel} />
  <T is={internals.centerGroup} />
  <T
    is={innerRef}
    matrixAutoUpdate={false}
  >
    {@render children?.()}
  </T>
</AddHandlers>
