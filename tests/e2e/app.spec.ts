import { test, expect } from '@playwright/test';

test.describe('Piscinão Araçatuba - End-to-End Suite', () => {
  test('Client Web App renders brand title and navigation tabs', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveTitle(/Piscinão Araçatuba/i);
    await expect(page.locator('text=PISCINÃO')).toBeVisible();
  });

  test('Admin Panel renders dashboard title and navigation sidebar', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page).toHaveTitle(/Piscinão - Painel Admin/i);
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('text=Gerenciamento de Clientes').or(page.locator('text=Dashboard'))).toBeVisible();
  });
});
