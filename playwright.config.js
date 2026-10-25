import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 120000,
  use: {
    baseURL: process.env.TEST_URL || "http://localhost:4173",
    headless: true,
  },
  webServer: process.env.TEST_URL
    ? undefined
    : {
        command: "npx vite preview --host 0.0.0.0 --port 4173",
        url: "http://localhost:4173",
        reuseExistingServer: true,
      },
});
