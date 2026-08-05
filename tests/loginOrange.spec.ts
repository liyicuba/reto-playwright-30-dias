import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { SidePanel, SidePanelItems } from '../components/SidePanel';
import { SearchInput } from '../components/SearchInput';
import { Environment } from '../config/Environment';
import { AddNewUserPage } from '../pageobjects/AddNewUserPage'
import { UserFactory } from '../factory/UserFactory';


/*test('Login OrangeHRM', async ({ page }) => {
    /*const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();*/

   /* await page.goto('/web/index.php/dashboard/index')

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);
     
    
})*/

/*test('Search on SidePanel', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin()

    const searchInput = new SearchInput(page);
    await searchInput.searchAndValidate(SidePanelItems.Admin);
});*/


/*test('Login as Employee OrangeHRM', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasEmployee();

    await expect(page.getByRole('link', {name: 'Admin'})).not.toBeVisible()

    

})*/

/*test('Invalid Login OrangeHRM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithWrongCredentials();

    await expect(page.getByText('Invalid credentials')).toBeVisible()
});*/

/*test('Crear un nuevo usuario', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    const adminUser = UserFactory.createAdmin ({

         employeeName: 'test'
    })


    const addNewUserPage = new AddNewUserPage(page);
    await addNewUserPage.addNewUser(adminUser);

    await addNewUserPage.checkToastMessage();

})*/

/*test('Crear un nuevo usuario con distinta contraseña', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    const employeeESSUser = UserFactory.createEmployeeESS({
        employeeName: 'test',
        confirmPassword: 'wrongPassword123!'
    })

    const addNewUserPage = new AddNewUserPage(page)
    await addNewUserPage.addNewUser(employeeESSUser);
    await addNewUserPage.checkErrorPasswordMessage();

})*/

/*est('Crear un nuevo usuario Admin con contraseña incorrecta', async ({ page }) => {

    
    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    const adminUser = UserFactory.createAdmin({
        employeeName: 'test',
        confirmPassword: 'wrongPassword123!'

    });

    const addNewUserPage = new AddNewUserPage(page);
    await addNewUserPage.addNewUser(adminUser);

    await addNewUserPage.checkErrorPasswordMessage();

})*/

test('Crear un nuevo usuario Admin', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    const currentAdminRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    })

    //await expect(currentAdminRows).toHaveCount(1)

    const firstAdminSearch = currentAdminRows.nth(0)
    await expect(firstAdminSearch, "Admin user not found in the table").toHaveCount(1)

    await firstAdminSearch
    .locator('button')
    .filter({ has: page.locator('i.bi-pencil-fill') }).click()

    const fullUserToSearch = await page.getByRole('textbox',{name: 'Type for hints...'}).inputValue()
    console.log('Full user to search: ', fullUserToSearch)

    const adminUser = UserFactory.createAdmin ({

         employeeName: fullUserToSearch
    })

    await page.goBack()

    const addNewUserPage = new AddNewUserPage(page);
    await addNewUserPage.addNewUser(adminUser);
    await addNewUserPage.checkToastMessage();

})


test('Crear un nuevo usuario ESS', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    const currentESSRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('ESS')
    })

    const firstESSSearch = currentESSRows.nth(0)
    await expect(firstESSSearch, "ESS user not found in the table").toBeVisible()

    await firstESSSearch
    .locator('button')
    .filter({ has: page.locator('i.bi-pencil-fill') }).click()

    const employeeNameField = page.getByRole('textbox', { name: 'Type for hints...' });
    await employeeNameField.waitFor({ state: 'visible', timeout: 50000 });

    const fullUserToSearch = await employeeNameField.inputValue();
    console.log('Full user to search: ', fullUserToSearch)

   
    const employeeESSUser = UserFactory.createEmployeeESS({
         employeeName: fullUserToSearch
    })

    await page.goBack()

    const addNewUserPage = new AddNewUserPage(page);
    await addNewUserPage.addNewUser(employeeESSUser);
    await addNewUserPage.checkToastMessage();


})
