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

  // Always include all handlers as permanent wrappers so Threlte's interactivity
  // plugin registers the object at init time (it bails if no handlers are present).
  // Hover/active conditionals add onpointerenter/onpointerleave to component.handlers
  // after the first resetProperties call — too late for Threlte to pick them up if
  // we only include handlers that are currently set.
  const allHandlers = $derived.by(() => {
    const h = reactiveHandlers.current
    const obj: Record<string, unknown> = {}

    for (const [uikitKey, svelteKey] of uikitToSvelteKeys) {
      obj[svelteKey] = (event: any) => {
        const handler = h[uikitKey]
        if (handler == null) return
        // Threlte wraps the native event in `event.nativeEvent`, but uikit handlers
        // destructure properties like `pointerId` from the top level. Merge the
        // native event into the top level so both can be accessed.
        handler(event?.nativeEvent != null ? { ...event.nativeEvent, ...event } : event)
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
