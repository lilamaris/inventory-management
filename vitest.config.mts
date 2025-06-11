import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        name: 'unit',
        environment: 'node',
        setupFiles: ['./test/setup.ts'],
    },
    resolve: {
        alias: {
            '@': new URL('./', import.meta.url).pathname,
        },
    },
})
