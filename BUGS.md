# Threlte Bugs

---

## Bug: `intersectObjects` dedup key treats all mesh faces as distinct hits

**Package**: `@threlte/extras` — present through 9.13.2
**File**: `dist/interactivity/setupInteractivity.svelte.js`

The dedup key in `getHits()` uses `hit.index !== undefined` to decide whether to include the face index. For a regular `Mesh` (including uikit's shared `PlaneGeometry`), `hit.index` is defined (it is the triangle index: 0 or 1), so both faces get different keys and both are kept — every event fires twice for uikit components.

**Workaround**: `createHandlers.svelte.ts` deduplicates at the handler level using a `WeakMap<nativeEvent, Set<eventType>>`. Since the native event object is the same reference across all hits in a single dispatch, the second hit for the same (nativeEvent, eventType) pair is dropped before the uikit handler is called. This is self-contained in the library and invisible to users.
