import { useThrelte, useTask } from '@threlte/core'
import { reversePainterSortStable, type Component, type RenderContext } from '@pmndrs/uikit'
import { createHandlers } from './createHandlers.svelte'
import { useDefaultProperties } from './useDefaultProperties'
import { useFontFamilies } from './useFontFamilies'
import type { EventHandlers } from './Events'

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

  // @TODO: Remove optional once @threlte/test supports webgl2 context mocking
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

  return { handlers: createHandlers(component.handlers) }
}
