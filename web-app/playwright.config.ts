import { defineConfig, devices } from '@playwright/test'

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './__tests__/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2, // Reduced from 4 to 2 for stability
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['json', { outputFile: 'playwright-report/results.json' }]],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.CI ? 'https://web-99kxh0sku-giquinas-projects.vercel.app' : 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    /* Video recording */
    video: 'retain-on-failure',
    /* Global timeout for actions - Increased for Portuguese community content loading */
    actionTimeout: 30000,
    /* Navigation timeout - Increased for live deployment */
    navigationTimeout: 60000,
    /* Expect timeout for assertions */
    expect: {
      timeout: 10000
    }
  },

  /* Configure projects for major browsers */
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

    /* Test against mobile viewports for Portuguese community mobile users */
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        // Portuguese community mobile testing
        locale: 'pt-PT',
        timezoneId: 'Europe/London',
      },
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        // Portuguese community mobile testing  
        locale: 'pt-PT',
        timezoneId: 'Europe/London',
      },
    },

    /* Test with Portuguese locale */
    {
      name: 'Portuguese Desktop',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'pt-PT',
        timezoneId: 'Europe/London',
        // Extra viewport for Portuguese content
        viewport: { width: 1366, height: 768 },
      },
    },
  ],

  /* Global test configuration */
  timeout: 90000, // 90 seconds for slower Portuguese cultural content loading
  expect: {
    timeout: 15000 // Increased expect timeout for community content
  },
  outputDir: 'test-results/',

  /* Development server configuration for local testing */
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000, // 3 minutes for Portuguese community dev server startup
  },
})
