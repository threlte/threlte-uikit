import { useThrelte, useTask } from '@threlte/core'
import { reversePainterSortStable, type Component, type RenderContext } from '@pmndrs/uikit'
import { useInteractivity } from '@threlte/extras'
import type { Intersection } from 'three'
import { createHandlers } from './createHandlers.svelte'
import { useDefaultProperties } from './useDefaultProperties.js'
import { useFontFamilies } from './useFontFamilies.svelte.js'
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
}

// uikit components share a single PlaneGeometry (2 triangles). A ray through
// the centre hits both faces, producing index:0 and index:1 for the same UUID.
// Threlte 9.13.1 deduplicates by `uuid|index|instanceId`, keeping both hits
// and causing every event to fire twice for uikit components.
//
// The correct key is context-sensitive:
//   - Instanced meshes:  uuid|instanceId  (each instance is a distinct object)
//   - THREE.Points:      uuid|index       (each point is a distinct target)
//   - Everything else:   uuid             (multiple face hits = same surface)
const dedupedContexts = new WeakSet<object>()

function installDedupFilter() {
  let ctx: ReturnType<typeof useInteractivity> | undefined
  try {
    ctx = useInteractivity()
  } catch {
    return
  }
  if (dedupedContexts.has(ctx)) return
  dedupedContexts.add(ctx)
  const userFilter = ctx.filter
  ctx.filter = (hits: Intersection[], context: unknown) => {
    const base = userFilter ? userFilter(hits, context as never) : hits
    const seen = new Set<string>()
    return base.filter((hit) => {
      const key =
        hit.instanceId != null
          ? `${hit.object.uuid}|${hit.instanceId}`
          : (hit.object as { isPoints?: boolean }).isPoints
            ? `${hit.object.uuid}|${hit.index}`
            : hit.object.uuid
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }
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

  installDedupFilter()

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
