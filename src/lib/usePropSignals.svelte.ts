import { signal } from '@preact/signals-core'
import type { AllOptionalProperties } from '@pmndrs/uikit/internals'
import { useDefaultProperties } from './useDefaultProperties'

export const usePropertySignals = <T>(props: () => T) => {
  const defaultProperties = useDefaultProperties()

  const style = signal<T | undefined>()
  const properties = signal<T | undefined>()
  const defaults = signal<AllOptionalProperties | undefined>(defaultProperties.current)

  $effect.pre(() => {
    defaults.value = defaultProperties.current
  })

  $effect.pre(() => {
    properties.value = { ...props() }
  })

  return {
    style,
    properties,
    defaults,
  }
}
