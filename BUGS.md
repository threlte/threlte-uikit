# Threlte Bugs

---

## Bug: `intersectObjects` dedup key treats all mesh faces as distinct hits

**Package**: `@threlte/extras` — present in 9.13.1
**File**: `dist/interactivity/setupInteractivity.svelte.js`

The 9.13.1 fix deduplicates raw intersection hits using:

```js
const key = `${hit.object.uuid}|${hit.index}|${hit.instanceId}`;
```

This was added to preserve distinct hits for instanced meshes (`instanceId`) and `THREE.Points` (`index`). However, `index` also varies across triangle faces of a regular `Mesh`. A ray through the centre of a `PlaneGeometry` (2 triangles) returns two hits with the same UUID but `index: 0` and `index: 1` — different keys — so both are kept and every pointer event fires twice.

uikit components all share the same `PlaneGeometry` singleton, so they are affected on every pointer event.

**Proposed fix**: Make the key context-sensitive rather than always including `index`:

```js
// instanced mesh  → uuid + instanceId  (each instance is a distinct target)
// THREE.Points    → uuid + index        (each point is a distinct target)
// regular Mesh    → uuid only           (multiple face hits = same surface)
const key =
    hit.instanceId != null
        ? `${hit.object.uuid}|${hit.instanceId}`
        : hit.object.isPoints
            ? `${hit.object.uuid}|${hit.index}`
            : hit.object.uuid;
```

> **Workaround**: `build.svelte.ts` installs this corrected dedup as a `ctx.filter` on the interactivity context via `installDedupFilter`. Once fixed in Threlte this workaround can be removed.
