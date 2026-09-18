import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    // Usamos 127.0.0.1 para evitar problemas de IPv6 en GitHub Actions
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
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
  ],

  // ← AQUÍ ESTÁ LA MAGIA
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://127.0.0.1:3000/health',
    reuseExistingServer: true, // <--- ESTO EVITA EL CONFLICTO DE PUERTO
    timeout: 120_000,
  },
});