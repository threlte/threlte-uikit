import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { threlteTesting } from '@threlte/test/vite'

export default defineConfig({
  plugins: [sveltekit(), threlteTesting()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    browser: {
      provider: 'playwright',
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
})
