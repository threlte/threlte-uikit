# threlte-uikit

`threlte-uikit` wraps [`@pmndrs/uikit`](https://github.com/pmndrs/uikit) in a declarative syntax for use with [Threlte](https://threlte.xyz).

```
npm i threlte-uikit
```

## Subpath exports

| Import path             | Contents                                    |
| ----------------------- | ------------------------------------------- |
| `threlte-uikit`         | Core primitives (`Container`, `Text`, etc.) |
| `threlte-uikit/kit`     | Kit component library                       |
| `threlte-uikit/horizon` | Horizon component library                   |
| `threlte-uikit/lucide`  | Lucide icon components                      |

## Getting started

```svelte
<script>
  import { T } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { Container, Text } from 'threlte-uikit'

  interactivity()
</script>

<T.Group>
  <Container
    padding={10}
    backgroundColor="#ccc"
  >
    <Text text="Hello uikit!" />
  </Container>
</T.Group>
```

The component instance may be accessed via the `ref` property.

```svelte
<Container bind:ref>...</Container>
```

## Core primitives

These components map 1:1 to the `@pmndrs/uikit` primitives. See the [uikit component docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties) for the full property reference.

| Component    | Docs                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- |
| `Container`  | [docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#container)  |
| `Fullscreen` | [docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#fullscreen) |
| `Image`      | [docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#image)      |
| `Text`       | [docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#text)       |
| `SVG`        | [docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#svg)        |
| `Content`    | [docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#content)    |
| `Input`      | [docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#input)      |
| `Textarea`   | [docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#textarea)   |
| `Video`      | [docs](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#video)      |

## Scrollable containers

Set `overflow="scroll"` on any `Container` to make it scrollable. Requires `interactivity()` to be active.

```svelte
<Container
  overflow="scroll"
  height={200}
  flexDirection="column"
>
  {#each items as item}
    <Text text={item} />
  {/each}
</Container>
```

## Events

Invoke the Threlte [`interactivity`](https://threlte.xyz/docs/reference/extras/interactivity) plugin in the same component or a parent to enable pointer events. All events supported by `interactivity` are supported.

```svelte
<Container
  onclick={() => console.log('clicked')}
  onpointerenter={() => console.log('entered')}
  onpointerleave={() => console.log('left')}
>
  <Text text="I am a button" />
</Container>
```

`hover` and `active` conditional properties also require `interactivity()`:

```svelte
<Container
  backgroundColor="red"
  hover={{ backgroundColor: 'purple' }}
  active={{ backgroundColor: 'blue' }}
>
  ...
</Container>
```

## Kit components

Import from `threlte-uikit/kit`. These are unstyled, accessible components built on the uikit primitives, inspired by [shadcn/ui](https://ui.shadcn.com).

| Component          | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `Alert`            | Alert banner with icon, title, and description slots |
| `AlertIcon`        | Icon slot for `Alert`                                |
| `AlertTitle`       | Title slot for `Alert`                               |
| `AlertDescription` | Description slot for `Alert`                         |
| `Accordion`        | Collapsible accordion container                      |
| `AccordionItem`    | Individual accordion section                         |
| `AccordionTrigger` | Clickable accordion header                           |
| `AccordionContent` | Accordion body content                               |
| `Avatar`           | Circular image avatar                                |
| `Badge`            | Small label badge                                    |
| `Button`           | Pressable button                                     |
| `Card`             | Card container                                       |
| `CardHeader`       | Card header section                                  |
| `CardTitle`        | Card title                                           |
| `CardDescription`  | Card description                                     |
| `CardContent`      | Card body content                                    |
| `CardFooter`       | Card footer section                                  |
| `Checkbox`         | Checkbox with checked/unchecked state                |
| `KitInput`         | Single-line text input                               |
| `KitTextarea`      | Multi-line text input                                |
| `Label`            | Form label                                           |
| `Progress`         | Linear progress bar                                  |
| `RadioGroup`       | Radio group container                                |
| `RadioGroupItem`   | Individual radio item                                |
| `Separator`        | Horizontal divider                                   |
| `Skeleton`         | Loading skeleton placeholder                         |
| `Slider`           | Range slider                                         |
| `Switch`           | Toggle switch                                        |
| `Tabs`             | Tab container                                        |
| `TabsList`         | Tab navigation bar                                   |
| `TabsTrigger`      | Individual tab button                                |
| `TabsContent`      | Tab panel content                                    |
| `Toggle`           | Pressable toggle button                              |
| `ToggleGroup`      | Group of toggle buttons                              |
| `ToggleGroupItem`  | Individual item in a `ToggleGroup`                   |

## Horizon components

Import from `threlte-uikit/horizon`. A fully themed component set that supports light and dark mode automatically.

| Component           | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `Panel`             | Rounded card container                                                   |
| `Button`            | Button with `primary`, `secondary`, `tertiary`, `negative` variants      |
| `Badge`             | Label badge with `primary`, `secondary`, `positive`, `negative` variants |
| `Avatar`            | Circular image avatar (`sm`, `md`, `lg`)                                 |
| `Checkbox`          | Styled checkbox                                                          |
| `Toggle`            | Styled toggle switch                                                     |
| `Slider`            | Styled range slider                                                      |
| `ProgressBar`       | Linear progress indicator                                                |
| `RadioGroup`        | Styled radio group                                                       |
| `RadioGroupItem`    | Styled radio item                                                        |
| `Input`             | Styled text input with optional icon                                     |
| `InputField`        | Labeled input field                                                      |
| `Dropdown`          | Styled dropdown                                                          |
| `DropdownButton`    | Dropdown trigger button                                                  |
| `DropdownTextValue` | Displays the selected dropdown value                                     |
| `DropdownList`      | Dropdown option list                                                     |
| `DropdownListItem`  | Individual dropdown option                                               |
| `IconIndicator`     | Status indicator dot (`none`, `good`, `poor`, `bad`)                     |
| `Divider`           | Horizontal rule                                                          |

## Lucide icons

Import from `threlte-uikit/lucide`. Renders any [Lucide](https://lucide.dev) icon as a uikit element.

```svelte
<script>
  import { Icon, SearchIcon } from 'threlte-uikit/lucide'
</script>

<Icon
  is={SearchIcon}
  width={24}
  height={24}
/>
```

All Lucide icon components are re-exported from this subpath.

## Utilities

### `provideDefaultProperties()`

Overrides default properties for all uikit components within the calling component's subtree.

```ts
let defaultProps = $state({ margin: 10 })
provideDefaultProperties(() => defaultProps)
```

### `provideFontFamilies()`

Provides custom font families to the subtree. See the [uikit custom fonts guide](https://docs.pmnd.rs/uikit/tutorials/custom-fonts) for how to generate compatible font JSON files.

```ts
provideFontFamilies({
  roboto: {
    light: 'url-to-json',
    medium: 'url-to-json',
    bold: 'url-to-json',
  },
})
```

## Dark mode

`threlte-uikit` inherits dark mode from `@pmndrs/uikit` via the `isDarkMode` signal. Horizon components automatically respond to dark/light mode changes.

```svelte
<script>
  import { isDarkMode } from 'threlte-uikit'
</script>

<div>
  {isDarkMode.current ? 'Light mode' : 'Dark mode'}
</div>
```

## Camera controls

When using `CameraControls` or `OrbitControls` from `@threlte/extras`, they are automatically detected by `threlte-uikit` and disabled during UI pointer interactions such as drags and scrolls — no extra configuration required.

```svelte
<script>
  import { CameraControls, interactivity } from '@threlte/extras'
  import { Container } from 'threlte-uikit'

  interactivity()
</script>

<CameraControls />

<Container>
  <!-- Sliders, scrollable containers, etc. automatically disable CameraControls while active -->
</Container>
```
