import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testMatch: '**/?(*.)spec.?(c|m)[jt]s?(x)',
  testIgnore: '**/backend/**',

  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  fullyParallel: true,
  forbidOnly: process.env.CI !== undefined,
  retries: process.env.CI !== undefined ? 2 : 0,
  workers: process.env.CI !== undefined ? 1 : undefined,

  reporter: 'html',
  use: {
    baseURL: 'https://localhost:5173',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'npm run dev',
    url: 'https://localhost:5173',
    reuseExistingServer: process.env.CI === undefined,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    {
      name: 'Microsoft Edge',
      use: { channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { channel: 'chrome' },
    },
  ],
})
