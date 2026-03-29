import { isDarkMode as isDarkModeSignal } from '@pmndrs/uikit'
import { fromStore } from 'svelte/store'

export const isDarkMode = fromStore(isDarkModeSignal)
