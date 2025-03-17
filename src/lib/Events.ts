import type { Intersection } from 'three'
import type { IntersectionEvent } from '@threlte/extras'

export type ThreeEvent<TSourceEvent> = Intersection & {
  nativeEvent: TSourceEvent
  defaultPrevented?: boolean
  stopped?: boolean
  stopPropagation?: () => void
}

export type EventMap = {
  mouse: ThreeEvent<MouseEvent>
  wheel: ThreeEvent<WheelEvent>
  pointer: ThreeEvent<PointerEvent>
}

export type KeyToEvent<K extends keyof EventHandlers> = Parameters<
  Required<EventHandlers>[K]
>[0]

export type EventHandlers = {
  onclick?: (event: IntersectionEvent<MouseEvent>) => void
  oncontextmenu?: (event: IntersectionEvent<MouseEvent>) => void
  ondblclick?: (event: IntersectionEvent<MouseEvent>) => void
  onpointerup?: (event: IntersectionEvent<PointerEvent>) => void
  onpointerdown?: (event: IntersectionEvent<PointerEvent>) => void
  onpointerover?: (event: IntersectionEvent<PointerEvent>) => void
  onpointerout?: (event: IntersectionEvent<PointerEvent>) => void
  onpointerenter?: (event: IntersectionEvent<PointerEvent>) => void
  onpointerleave?: (event: IntersectionEvent<PointerEvent>) => void
  onpointermove?: (event: IntersectionEvent<PointerEvent>) => void
  onpointermissed?: (event: IntersectionEvent<PointerEvent>) => void
  onpointercancel?: (event: IntersectionEvent<PointerEvent>) => void
  onwheel?: (event: IntersectionEvent<WheelEvent>) => void
}
