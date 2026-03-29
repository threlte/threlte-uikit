# Threlte Bugs

---

## Bug: `intersectObjects` dedup key treats all mesh faces as distinct hits

**Package**: `@threlte/extras` — present through 9.13.2
**File**: `dist/interactivity/setupInteractivity.svelte.js`

The dedup key in `getHits()` uses `hit.index !== undefined` to decide whether to include the face index. For a regular `Mesh` (including uikit's shared `PlaneGeometry`), `hit.index` is defined (it is the triangle index: 0 or 1), so both faces get different keys and both are kept — every event fires twice for uikit components.

**Workaround**: `createHandlers.svelte.ts` deduplicates at the handler level using a `WeakMap<nativeEvent, Set<eventType>>`. Since the native event object is the same reference across all hits in a single dispatch, the second hit for the same (nativeEvent, eventType) pair is dropped before the uikit handler is called. This is self-contained in the library and invisible to users.

---

## Bug: `stopImmediatePropagation` on synthetic events does not block OrbitControls

**Package**: `@threlte/extras` — interactivity system
**Affected**: drag interactions (Slider, scrollable containers, Input)

`@pmndrs/uikit` calls `event.stopImmediatePropagation()` internally during drags and scrolls to prevent pointer events from reaching camera controls (OrbitControls, etc.). In React Three Fiber this works transparently because R3F's event system propagates the original native DOM `PointerEvent` object, so stopping propagation on it actually blocks any other listeners (including OrbitControls) on the same native event.

Threlte's interactivity system calls component handlers directly with a synthetic event object that wraps the native event in `event.nativeEvent`. The native event has already been fully dispatched by the time uikit's `stopImmediatePropagation()` call runs, so OrbitControls — which listens to the canvas directly — is unaffected.

**How Threlte could fix this**: Before calling each component handler, check whether the handler calls `stopImmediatePropagation()` on the event (or expose a flag on the synthetic event that maps back to `nativeEvent.stopImmediatePropagation()`). The cleanest fix would be to make the synthetic event's `stopImmediatePropagation` method delegate to `event.nativeEvent.stopImmediatePropagation()`, so that stopping propagation inside a handler actually stops the native event from reaching any further DOM listeners.

**Workaround**: None implemented in this library. Users can manually disable their camera controls on `pointerdown` and re-enable on `pointerup`/`pointerleave`/`pointercancel` using a context like `useControlsContext`.
