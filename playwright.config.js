// playwright.config.js
// See: https://playwright.dev/docs/test-configuration
/**
 * Playwright config for deterministic multi-browser, headed run, fully parallel with HTML report, video for failures only.
 */
const { devices } = require('@playwright/test');

/**
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  timeout: 50000, // Each test max 50s
  expect: { timeout: 30000 },
  fullyParallel: true,
  workers: 2,
  reporter: [['html', { open: 'always' }], ['list']],
  retries: 1, // single retry for robustness
  use: {
    browserName: 'chromium', // Will be overridden per-project
    headless: false, // Run in headed mode for visibility
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', // Video only for failed tests
    actionTimeout: 30000,
    navigationTimeout: 50000,
    trace: 'retain-on-failure', // Traces for failed tests
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: 500 // Reduce as needed, enables visual debugging as per requirements
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    }
  ],
};

module.exports = config;