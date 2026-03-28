import { getContext, setContext } from 'svelte'
import type { FontFamilies } from '@pmndrs/uikit'

const contextKey = Symbol('font-family-context')

export const provideFontFamilies = (fontFamilies: FontFamilies) => {
  setContext(contextKey, fontFamilies)
}

export const useFontFamilies = () => {
  return getContext<FontFamilies | undefined>(contextKey)
}
