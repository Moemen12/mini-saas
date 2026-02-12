import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: [], // Add setup files if needed later
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/.next/**',
            '**/__tests__/e2e/**', // Exclude Playwright tests
        ],
    },
});
