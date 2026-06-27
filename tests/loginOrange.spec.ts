import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { SidePanel, SidePanelItems } from '../components/SidePanel';
import { SearchInput } from '../components/SearchInput';


test('Login OrangeHRM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);
     
    
});

test('Search on SidePanel', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

    const searchInput = new SearchInput(page);
    await searchInput.searchAndValidate(SidePanelItems.Admin);
});


test('Invalid Login OrangeHRM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'wrongpassword');

    await expect(page.getByText('Invalid credentials')).toBeVisible()
});


test('Login as Employee OrangeHRM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginasEmployee();

    await expect(page.getByRole('link', {name: 'Admin'})).not.toBeVisible()

})