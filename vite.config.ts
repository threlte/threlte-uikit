import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { threlteTesting } from '@threlte/test/vite'
import { playwright } from '@vitest/browser-playwright'

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
