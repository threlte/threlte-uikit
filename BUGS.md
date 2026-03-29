# Threlte Bugs

---

## Bug: `stopImmediatePropagation` cannot reliably block camera controls

**Package**: `@threlte/extras` — interactivity system
**Affected**: drag interactions (Slider, scrollable containers, Input)

`@pmndrs/uikit` calls `event.stopImmediatePropagation()` internally during drags and scrolls to prevent pointer events from reaching camera controls. In React Three Fiber this works because R3F registers its canvas listener before OrbitControls, guaranteeing the right order.

In Threlte, both the interactivity system and `CameraControls`/`OrbitControls` listen on the **same `dom` element** (the canvas wrapper div — see `Canvas.svelte` and `CameraControls.svelte`). `camera-controls` is constructed synchronously in `CameraControls.svelte` at component creation time, while Threlte's interactivity registers via `$effect.pre`. Depending on Svelte's effect scheduling order relative to child component instantiation, camera controls may register its `pointerdown` listener first — meaning `stopImmediatePropagation` called inside Threlte's handler fires too late to stop it.

Additionally, Threlte throttles `pointermove` through `requestAnimationFrame` (`handlePointerMove` in `setupInteractivity`), so any `stopImmediatePropagation` call for move events is always deferred and therefore ineffective.

**Workaround**: This library uses `controls.enabled = false/true` via `useControlsContext` to explicitly disable/re-enable camera controls on `pointerdown`/`pointerup`. This is reliable regardless of listener order, at the cost of requiring users to register their controls via `useControlsContext`.

**How Threlte could fix this**: Register the interactivity `pointerdown` listener on `dom` before camera controls components can. One approach: register with `{ capture: true }` so the interactivity handler always fires before any bubbling listeners regardless of registration order.
