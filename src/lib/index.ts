// Contexts
export { provideDefaultProperties } from './useDefaultProperties'
export { provideFontFamilies } from './useFontFamilies'

// Build utilities
export { useRenderContext, build } from './build.svelte'

export {
  basedOnPreferredColorScheme,
  setPreferredColorScheme,
  getPreferredColorScheme,
  isDarkMode,
  canvasInputProps,
  readReactive,
  withOpacity,
  type PreferredColorScheme,
  type MaterialClass,
  type ColorRepresentation,
  type FontFamilies,
  type Listeners,
  type ScrollListeners,
  // Vanilla component classes
  Component as VanillaComponent,
  Container as VanillaContainer,
  Content as VanillaContent,
  Custom as VanillaCustom,
  Fullscreen as VanillaFullscreen,
  Image as VanillaImage,
  Input as VanillaInput,
  Svg as VanillaSvg,
  Text as VanillaText,
  Textarea as VanillaTextarea,
  Video as VanillaVideo,
  // Property types
  type ContainerProperties,
  type ContentProperties,
  type CustomProperties,
  type FullscreenProperties,
  type ImageProperties,
  type InputProperties,
  type SvgProperties,
  type TextProperties,
  type TextareaProperties,
  type VideoProperties,
} from '@pmndrs/uikit'

// Components
export { default as Container } from './components/Container.svelte'
export { default as Content } from './components/Content.svelte'
export { default as Custom } from './components/Custom.svelte'
export { default as Fullscreen } from './components/Fullscreen.svelte'
export { default as Image } from './components/Image.svelte'
export { default as Input } from './components/Input.svelte'
export { default as Root } from './components/Root.svelte'
export { default as SVG } from './components/Svg.svelte'
export { default as Text } from './components/Text.svelte'
export { default as Textarea } from './components/Textarea.svelte'
export { default as Video } from './components/Video.svelte'

// Event types
export type { EventHandlers } from './Events'
