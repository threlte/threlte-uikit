<script lang="ts">
  import { Object3D } from 'three'
  import { T } from '@threlte/core'
  import { signal } from '@preact/signals-core'
  import {
    createTextState,
    setupText,
    type FontFamilies,
    type TextProperties,
  } from '@pmndrs/uikit/internals'
  import { useFontFamilies } from '$lib/useFontFamilies'
  import { useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals.svelte'
  import { useInternals, type ComponentInternals } from '$lib/useInternals'
  import type { EventHandlers } from '$lib/Events'
  import { createHandlers } from '$lib/createHandlers.svelte'

  type Props = TextProperties & {
    ref?: ComponentInternals
    name?: string
    text: string
  } & EventHandlers

  let { ref = $bindable(), name, text, ...rest }: Props = $props()

  const parent = useParent()
  const outerRef = new Object3D()

  const { style, properties, defaults } = usePropertySignals<TextProperties>(() => rest)

  const textSignal = signal(text)
  $effect.pre(() => {
    textSignal.value = text
  })

  const fontContext = useFontFamilies()
  const fontFamilies = signal<FontFamilies | undefined>(fontContext)

  $effect.pre(() => {
    fontFamilies.value = fontContext
  })

  const internals = createTextState(
    parent,
    textSignal,
    fontFamilies,
    style,
    properties,
    defaults
  )
  $effect.pre(() => {
    internals.interactionPanel.name = name ?? ''
  })

  $effect.pre(() => {
    const abortController = new AbortController()
    setupText(internals, parent, style, properties, outerRef, abortController.signal)
    return () => abortController.abort()
  })

  ref = useInternals(parent.root.pixelSize, style, internals, internals.interactionPanel)

  const allHandlers = createHandlers(internals.handlers, () => rest)
</script>

<T
  is={outerRef}
  matrixAutoUpdate={false}
  {...allHandlers.current}
>
  <T is={internals.interactionPanel} />
</T>
