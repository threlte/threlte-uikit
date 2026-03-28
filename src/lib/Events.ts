import type { IntersectionEvent } from '@threlte/extras'

export interface EventHandlers {
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
