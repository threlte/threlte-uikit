import type { EventHandlers } from '@pmndrs/uikit/internals'
import type { EventHandlers as UserEventHandlers } from '$lib/Events'
import type { ReadonlySignal } from '@preact/signals-core'
import { fromStore } from 'svelte/store'
import type { IntersectionEvent } from '@threlte/extras'
import type { ThreeEvent } from '@pmndrs/uikit'

const eventHandlerKeys: Array<keyof EventHandlers> = [
  'onClick',
  'onContextMenu',
  'onDoubleClick',
  'onPointerCancel',
  'onPointerDown',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerMove',
  'onPointerOut',
  'onPointerOver',
  'onPointerUp',
  'onWheel',
] as const

const keymap: Record<keyof EventHandlers, keyof UserEventHandlers> = {
  onClick: 'onclick',
  onContextMenu: 'oncontextmenu',
  onDoubleClick: 'ondblclick',
  onPointerCancel: 'onpointercancel',
  onPointerDown: 'onpointerdown',
  onPointerEnter: 'onpointerenter',
  onPointerLeave: 'onpointerleave',
  onPointerMove: 'onpointermove',
  onPointerOut: 'onpointerout',
  onPointerOver: 'onpointerover',
  onPointerUp: 'onpointerup',
  onWheel: 'onwheel',
}

export const createHandlers = (
  handlers: ReadonlySignal<EventHandlers>,
  userHandlers: () => UserEventHandlers
) => {
  let internalHandlers = fromStore(handlers)
  let externalHandlers = $derived(userHandlers())

  let allHandlers = $derived.by(() => {
    const obj: Record<string, any> = {}

    for (const key of eventHandlerKeys) {
      const userKey = keymap[key]
      const userHandler = externalHandlers[userKey]
      const handler = internalHandlers.current[key]

      if (userHandler === undefined) {
        obj[userKey] = handler
      } else {
        obj[userKey] = (event: IntersectionEvent<any>) => {
          handler?.(event as unknown as ThreeEvent)
          if ('stopped' in event && event.stopped) {
            return
          }
          userHandler(event)
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
