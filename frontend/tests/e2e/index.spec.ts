import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://localhost:5173/')

  await expect(page).toHaveTitle('SkyAdmin')

  await expect(page).toHaveURL('https://localhost:5173/')
})
