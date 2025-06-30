import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "https://www.ebay.com",
    headless: false,
    ignoreHTTPSErrors: true,
    screenshot: "on",
  },
  timeout: 35000,
  retries: 2,
  workers: 1,
  testDir: "tests",
});
