import type { IntersectionEvent } from '@threlte/extras'
import type { ScrollListeners } from '@pmndrs/uikit'

// Strips all uikit/native event handler properties from a Properties type so
// that only the Threlte-typed versions (from EventHandlers below) are visible.
// The lowercase names are included because Input/Textarea/Video expose native
// DOM handlers (e.g. onclick: null | ...) that conflict with our typed versions.
export type WithoutUikitHandlers<T> = Omit<
  T,
  | 'onClick' | 'onContextMenu' | 'onDblClick' | 'onWheel'
  | 'onPointerUp' | 'onPointerDown' | 'onPointerOver' | 'onPointerOut'
  | 'onPointerEnter' | 'onPointerLeave' | 'onPointerMove' | 'onPointerCancel'
  | 'onCheckedChange' | 'onValueChange' | 'onOpenChange'
  | 'onScroll' | 'onActiveChange' | 'onHoverChange' | 'onFocusChange'
  | 'onclick' | 'oncontextmenu' | 'ondblclick' | 'onwheel' | 'onscroll'
  | 'onpointerup' | 'onpointerdown' | 'onpointerover' | 'onpointerout'
  | 'onpointerenter' | 'onpointerleave' | 'onpointermove' | 'onpointercancel'
>

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
  onscroll?: ScrollListeners['onScroll']
  onactivechange?: (active: boolean) => void
  onhoverchange?: (hover: boolean) => void
}
