import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';


test('Login OrangeHRM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

    await page.getByRole('button', {name: 'Login'}).click()
    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()
});


test('Invalid Login OrangeHRM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'wrongpassword');

    await expect(page.getByText('Invalid credentials')).toBeVisible()
});