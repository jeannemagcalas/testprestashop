import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 300_000,
  use: {
    // headless: false
    viewport: { width: 1280, height: 800 },
    // baseURL: 'https://demo.prestashop.com/#/en/front'
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
    // ,
    // {
    //   name: 'Mobile Safari',
    //   use: { browserName: 'webkit', viewport: { width: 375, height: 667 } }
    // },
  ]
});
