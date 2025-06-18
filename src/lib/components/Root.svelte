<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Object3D } from 'three'
  import { T, useThrelte, useTask } from '@threlte/core'
  import {
    DEFAULT_PIXEL_SIZE,
    type RootProperties,
    createRootState,
    readReactive,
    reversePainterSortStable,
    setupRoot,
  } from '@pmndrs/uikit/internals'
  import { computed, signal } from '@preact/signals-core'
  import { createParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals.svelte'
  import { useInternals } from '$lib/useInternals'
  import type { EventHandlers } from '$lib/Events'
  import type { ComponentInternals } from '$lib/useInternals'
  import { createHandlers } from '$lib/createHandlers.svelte'

  type Props = RootProperties & {
    pixelSize?: number
    ref?: ComponentInternals
    name?: string
    children?: Snippet
  } & EventHandlers

  let { ref = $bindable(), pixelSize, name, children, ...rest }: Props = $props()

  const { camera, renderer, shouldRender, scheduler, renderStage, invalidate } =
    useThrelte()

  // @TODO(mp) Remove optional once @threlte/test supports webgl2 context mocking.
  renderer.setTransparentSort?.(reversePainterSortStable)

  const outerRef = new Object3D()
  const innerRef = new Object3D()

  const pixelSizeSignal = signal(pixelSize ?? DEFAULT_PIXEL_SIZE)
  $effect.pre(() => {
    pixelSizeSignal.value = pixelSize ?? DEFAULT_PIXEL_SIZE
  })

  const { style, properties, defaults } = usePropertySignals<RootProperties>(() => rest)

  const onFrameSet = new Set<(delta: number) => void>()

  let whileOnFrameRef = false

  const internals = createRootState(
    { current: outerRef },
    computed(() => readReactive(pixelSizeSignal.value)),
    style,
    properties,
    defaults,
    () => camera.current,
    renderer,
    onFrameSet,
    () => {
      if (whileOnFrameRef) {
        // request render unnecassary -> already rendering
        return
      }

      // not rendering -> requesting a new frame
      invalidate()
    },
    // requestFrame = invalidate, because invalidate always causes another frame
    invalidate
  )
  createParent(internals)

  $effect.pre(() => {
    internals.interactionPanel.name = name ?? ''
  })

  $effect.pre(() => {
    const abortController = new AbortController()
    setupRoot(internals, style, properties, outerRef, innerRef, abortController.signal)
    return () => abortController.abort()
  })

  ref = useInternals(pixelSizeSignal, style, internals, internals.interactionPanel)

  useTask(
    (delta) => {
      if (shouldRender()) {
        whileOnFrameRef = true
        for (const onFrame of onFrameSet) {
          onFrame(delta)
        }
        whileOnFrameRef = false
      }
    },
    {
      autoInvalidate: false,
      stage: scheduler.createStage(Symbol('uikit-stage'), { before: renderStage }),
    }
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
    matrixAutoUpdate={false}
    is={innerRef}
  >
    {@render children?.()}
  </T>
</T>
