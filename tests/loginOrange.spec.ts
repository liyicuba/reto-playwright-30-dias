import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { SidePanel, SidePanelItems } from '../components/SidePanel';
import { SearchInput } from '../components/SearchInput';
import { Environment } from '../config/Environment';


test('Login OrangeHRM', async ({ page }) => {
    /*const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();*/

    await page.goto('/web/index.php/dashboard/index')

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);
     
    
});

test('Search on SidePanel', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin()

    const searchInput = new SearchInput(page);
    await searchInput.searchAndValidate(SidePanelItems.Admin);
});


test('Login as Employee OrangeHRM', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasEmployee();

    await expect(page.getByRole('link', {name: 'Admin'})).not.toBeVisible()

    

})

test('Invalid Login OrangeHRM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithWrongCredentials();

    await expect(page.getByText('Invalid credentials')).toBeVisible()
});

test('Crear un nuevo usuario', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    await loginPage.nuevoEmployee();

    await expect(page.locator('p.oxd-text--toast-message')).toHaveText('Successfully Saved')
          


})

test('Crear un nuevo usuario con distinta contraseña', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    await loginPage.nuevowrongEmployee();


    const passwordsDoNotMatch = page.locator('//div[contains(@class, "user-password-row")]//span[contains(@class, "error")]') 
    //console.log('Texto completo del contenedor:', await passwordMismatchError.textContent());
    await expect(passwordsDoNotMatch).toHaveText('Passwords do not match')
    

})