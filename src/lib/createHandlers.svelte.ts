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

const disableKeys = new Set(['onpointerdown', 'onwheel'])
const enableKeys = new Set(['onpointerup', 'onpointerleave', 'onpointercancel'])

export const createHandlers = (
  handlers: ReadonlySignal<EventHandlersProperties>,
  disableControls?: () => void,
  enableControls?: () => void
) => {
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        obj[svelteKey] = (event: any) => {
          const native = event?.nativeEvent
          if (disableKeys.has(svelteKey)) disableControls?.()
          else if (enableKeys.has(svelteKey)) enableControls?.()
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
