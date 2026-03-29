import { sveltekit } from '@sveltejs/kit/vite'
import { threlteTesting } from '@threlte/test/vite'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [sveltekit(), threlteTesting()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    browser: {
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})
