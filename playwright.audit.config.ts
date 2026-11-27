import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e-audit', timeout: 45000, retries: 0, workers: 2,
  reporter: [['list'], ['html', {open: 'never', outputFolder: 'audit-report'}]],
  use: {baseURL: process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173', trace: 'retain-on-failure', screenshot: 'only-on-failure'},
  projects: [{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['Pixel 5']}}],
  webServer: process.env.AUDIT_BASE_URL ? undefined : {command:'python3 -m http.server 4173 --bind 127.0.0.1 --directory out',url:'http://127.0.0.1:4173',reuseExistingServer:false}
});
