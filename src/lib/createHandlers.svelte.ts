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
