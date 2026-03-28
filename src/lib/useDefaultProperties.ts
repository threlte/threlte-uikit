import { getContext, setContext } from 'svelte'
import type { ContainerProperties } from '@pmndrs/uikit'

const contextKey = Symbol('default-props-context')

interface Context {
  current: ContainerProperties
}

export const provideDefaultProperties = (defaultProperties: () => ContainerProperties) => {
  setContext<Context>(contextKey, {
    get current() {
      return defaultProperties()
    },
  })
}

export const useDefaultProperties = (): Context => {
  return getContext<Context | undefined>(contextKey) ?? { current: {} }
}
