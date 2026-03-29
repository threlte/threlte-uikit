import { useThrelte, useTask } from '@threlte/core'
import {
  reversePainterSortStable,
  type Component,
  type RenderContext,
} from '@pmndrs/uikit'
import { createHandlers } from './createHandlers.svelte'
import { useDefaultProperties } from './useDefaultProperties.js'
import { useFontFamilies } from './useFontFamilies.svelte.js'
import { useControlsContext } from './controls.svelte.js'
import type { EventHandlers } from './Events.js'

const svelteToUikitKeys: Record<string, string> = {
  onclick: 'onClick',
  oncontextmenu: 'onContextMenu',
  ondblclick: 'onDblClick',
  onpointercancel: 'onPointerCancel',
  onpointerdown: 'onPointerDown',
  onpointerenter: 'onPointerEnter',
  onpointerleave: 'onPointerLeave',
  onpointermove: 'onPointerMove',
  onpointerout: 'onPointerOut',
  onpointerover: 'onPointerOver',
  onpointerup: 'onPointerUp',
  onwheel: 'onWheel',
  oncheckedchange: 'onCheckedChange',
  onvaluechange: 'onValueChange',
  onopenchange: 'onOpenChange',
  onscroll: 'onScroll',
  onactivechange: 'onActiveChange',
  onhoverchange: 'onHoverChange',
  onfocuschange: 'onFocusChange',
}

export function useRenderContext(): RenderContext {
  const { invalidate } = useThrelte()
  return { requestFrame: invalidate }
}

export function build<T extends Component>(
  component: T,
  props: () => Record<string, unknown> & EventHandlers
) {
  const { renderer } = useThrelte()
  const defaultProperties = useDefaultProperties()
  const fontFamilies = useFontFamilies()
  const controlsContext = useControlsContext()

  renderer.localClippingEnabled = true
  renderer.setTransparentSort?.(reversePainterSortStable)

  // Component.update has a root guard so only the
  // actual root component does real work; non-root calls are no-ops.
  useTask((delta) => component.update(delta * 1000), { autoInvalidate: false })

  $effect.pre(() => {
    const p = props() as Record<string, unknown>
    const merged: Record<string, unknown> = { ...defaultProperties.current }

    if (fontFamilies !== undefined) {
      merged.fontFamilies = fontFamilies
    }

    for (const [key, value] of Object.entries(p)) {
      if (key === 'classList') continue
      const uikitKey = svelteToUikitKeys[key]
      merged[uikitKey ?? key] = value
    }

    component.resetProperties(merged)
  })

  $effect.pre(() => {
    const classList = (props() as Record<string, unknown>).classList
    if (!Array.isArray(classList)) {
      component.classList.set()
      return
    }

    component.classList.set(...classList)
  })

  // Track whether this component instance disabled the controls so we don't
  // re-enable them on unmount if the user intentionally disabled them themselves.
  let disabledControls = false

  const disableControls = () => {
    const c = controlsContext.controls as { enabled: boolean } | undefined
    if (c != null) {
      disabledControls = true
      c.enabled = false
    }
  }

  const enableControls = () => {
    const c = controlsContext.controls as { enabled: boolean } | undefined
    if (c != null) {
      disabledControls = false
      c.enabled = true
    }
  }

  $effect(() => {
    return () => {
      if (disabledControls) enableControls()
    }
  })

  return {
    handlers: createHandlers(component.handlers, disableControls, enableControls),
    disableControls,
    enableControls,
  }
}
