<script
  module
  lang="ts"
>
  import type { Object3D } from 'three'
  import { T } from '@threlte/core'
  import type { EventHandlers } from '@pmndrs/uikit/internals'
  import type { Snippet } from 'svelte'
  import type { ReadonlySignal } from '@preact/signals-core'
  import type { EventHandlers as UserEventHandlers } from '$lib/Events'

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
</script>

<script lang="ts">
  type Props = {
    ref: Object3D<any>
    userHandlers: UserEventHandlers
    handlers: ReadonlySignal<EventHandlers>
    children?: Snippet
  }

  let { ref, userHandlers, handlers, children }: Props = $props()

  let internalHandlers = $derived($handlers)
  let allHandlers = $derived.by(() => {
    const obj: Record<keyof UserEventHandlers, any> = {}

    for (const key of eventHandlerKeys) {
      const userKey = keymap[key]
      const userHandler = userHandlers[userKey]
      const handler = internalHandlers[key]

      if (userHandler === undefined) {
        obj[userKey] = handler
      } else {
        obj[userKey] = (event) => {
          handler?.(event)
          if ('stopped' in event && event.stopped) {
            return
          }
          userHandler(event)
        }
      }
    }

    return obj
  })
</script>

<T
  is={ref}
  matrixAutoUpdate={false}
  {...allHandlers}
>
  {@render children?.()}
</T>
