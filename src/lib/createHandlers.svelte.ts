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
        obj[svelteKey] = handler
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
