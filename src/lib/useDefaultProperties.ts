import { getContext, setContext } from 'svelte'
import type { AllOptionalProperties } from '@pmndrs/uikit/internals'

const contextKey = Symbol('default-props-context')

interface Context {
  current: AllOptionalProperties
}

export const provideDefaultProperties = (defaultProperties: () => AllOptionalProperties) => {
  setContext<Context>(contextKey, {
    get current() {
      return defaultProperties()
    },
  })
}

export const useDefaultProperties = (): Context => {
  return getContext<Context | undefined>(contextKey) ?? { current: {} }
}
