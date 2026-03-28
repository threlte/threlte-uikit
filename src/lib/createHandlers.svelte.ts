import type { EventHandlers as EventHandlersProperties } from '@pmndrs/uikit'
import type { ReadonlySignal } from '@preact/signals-core'
import { fromStore } from 'svelte/store'

const uikitToSvelteKeys: Array<[keyof EventHandlersProperties, string]> = [
  ['onClick', 'onclick'],
  ['onContextMenu', 'oncontextmenu'],
  ['onDblClick', 'ondblclick'],
  ['onPointerCancel', 'onpointercancel'],
  ['onPointerDown', 'onpointerdown'],
  ['onPointerEnter', 'onpointerenter'],
  ['onPointerLeave', 'onpointerleave'],
  ['onPointerMove', 'onpointermove'],
  ['onPointerOut', 'onpointerout'],
  ['onPointerOver', 'onpointerover'],
  ['onPointerUp', 'onpointerup'],
  ['onWheel', 'onwheel'],
]

// uikit components use a shared PlaneGeometry (2 triangles). A ray through the
// centre can hit both faces, causing Threlte to call each handler twice for the
// same native event. Deduplicate per (nativeEvent, eventType) pair using the
// native event object as a WeakMap key so entries are GC'd automatically.
const fired = new WeakMap<object, Set<string>>()

export const createHandlers = (handlers: ReadonlySignal<EventHandlersProperties>) => {
  const reactiveHandlers = fromStore(handlers)

  const allHandlers = $derived.by(() => {
    const obj: Record<string, unknown> = {}
    const h = reactiveHandlers.current

    for (const [uikitKey, svelteKey] of uikitToSvelteKeys) {
      const handler = h[uikitKey]
      if (handler != null) {
        // uikit handlers destructure `pointerId` from the top-level event object
        // (e.g. `({ pointerId }) => { if (pointerId == null) return; ... }`).
        // Threlte puts the native PointerEvent in `event.nativeEvent`. DOM Event
        // properties are not enumerable own properties, so `{ ...event.nativeEvent }`
        // gives `{}` — pointerId is never spread in. We explicitly copy it.
        obj[svelteKey] = (event: any) => {
          const native = event?.nativeEvent
          if (native != null) {
            let keys = fired.get(native)
            if (keys === undefined) fired.set(native, (keys = new Set()))
            if (keys.has(svelteKey)) return
            keys.add(svelteKey)
          }
          handler(native != null ? { pointerId: native.pointerId, ...event } : event)
        }
      }
    }

    return obj
  })

  return {
    get current() {
      return allHandlers
    },
  }
}
