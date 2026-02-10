import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import dotenv from 'dotenv';


dotenv.config({ path: path.resolve(__dirname, '.env.local') });
const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL;


export default defineConfig({
    testDir: path.join(__dirname, '__tests__/e2e'),
    fullyParallel: true,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'on',
        screenshot: 'off',
        baseURL: baseURL,
        actionTimeout: 10000,
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
    webServer: {
        command: 'npm run dev',
        url: baseURL,
        reuseExistingServer: true,
    },
});
