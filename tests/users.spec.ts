import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { SidePanel, SidePanelItems } from '../components/SidePanel';
import { SearchInput } from '../components/SearchInput';
import { Environment } from '../config/Environment';
import { AddNewUserPage } from '../pageobjects/AddNewUserPage'
import { UsersTable } from '../components/UsersTable';
import { UserFactory } from '../factory/UserFactory';


/*test('get all the usernames registered', async ({page}) =>{

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);
    
    const rows = page.getByRole('table').getByRole('row')
    const usernames:  string [] = []

    const rowCount = await rows.count()
    for (let i = 1; i < rowCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if (username) {
            usernames.push(username)
        }
    }
    console.log('Usernames:', usernames)


})*/

test('get all the Employees registered', async ({page}) =>{

    // Ya estás autenticado gracias al storageState del proyecto 'admin' (.auth/admin.json)
    await page.goto('/web/index.php/pim/viewEmployeeList')

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);
    
    const rows = page.getByRole('table').getByRole('row')
    const employees:  string [] = []

    const rowCount = await rows.count()
    for (let i = 1; i < rowCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(3)
        const employee = await cell.textContent()

        if (employee) {
            employees.push(employee)
        }
    }
    console.log('Employees:', employees)

})

/*test('Select specific user for edition', async ({page}) =>{

    const userForEdition = 'teamseven'

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    const pencilIcon = page
     .getByRole('table')
     .getByRole('row')
     .filter({hasText: userForEdition})
     .locator('button')
     .filter({has: page.locator('i.bi-pencil-fill')})

     await pencilIcon.click()

    const currentUsername = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input").inputValue()
    expect(currentUsername).toBe(userForEdition)

})*/

/*test('Select random user different from Admin and validate', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    await page.waitForSelector('div.oxd-table-body');

    const filas = page.locator('div.oxd-table-body .oxd-table-row');
    const cantidadFilas = await filas.count();

    const usuarios = [];

    for (let i = 0; i < cantidadFilas; i++) {
        const fila = filas.nth(i);
        const celdas = fila.locator('.oxd-table-cell');
        const username = (await celdas.nth(1).innerText()).trim();
        const employeeName = (await celdas.nth(3).innerText()).trim();
        usuarios.push({ username, employeeName });
    }

 
    const usuariosFiltrados = usuarios.filter(u => u.username !== 'Admin');
    const random = usuariosFiltrados[Math.floor(Math.random() * usuariosFiltrados.length)];

    console.log(`Usuario random seleccionado: ${random.username}`);

    const pencilIcon = page
    .getByRole('table')
    .getByRole('row')
    .filter({ hasText: random.username })
    .locator('button')
    .filter({ has: page.locator('i.bi-pencil-fill') });

    await pencilIcon.click();
  
    await page.waitForLoadState('networkidle');

    const usernameEnEdit = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input").inputValue()

    console.log(`Username en página de edit: ${usernameEnEdit}`);

    expect(usernameEnEdit.trim()).toBe(random.username);

    console.log(`✅ Validación OK: "${usernameEnEdit}" coincide con "${random.username}"`);
});*/

test('Check user role options', async ({page}) => {

    const expectedRoleOPtions= ['-- Select --', 'Admin', 'ESS']

    const loginPage = new LoginPage(page)
    await loginPage.loginasAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SidePanelItems.Admin)

    const usersTable = new UsersTable(page)
    const currentUserRoleOptions = await usersTable.UserRoleDropdown()

    console.log(currentUserRoleOptions)

    expect(await currentUserRoleOptions.allInnerTexts(), 'The options displayed in the user Role dropdown do not match the expected options').toEqual(expectedRoleOPtions)
   
});

test ('Check Status Options displayed', async ({page})  => {
     
    const expectedStatusOptions = ['-- Select --', 'Enabled', 'Disabled']

    const loginPage = new LoginPage(page)
    await loginPage.loginasAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SidePanelItems.Admin)
    
    
    const usersTable = new UsersTable(page)
    const currentStatusOptions = await usersTable.StatusDropdown()

    console.log(currentStatusOptions)

    expect(await currentStatusOptions.allInnerTexts(), 'The option for Status dropdown do not match').toEqual(expectedStatusOptions)



});

test('Filter by user Admin', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginasAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SidePanelItems.Admin)

    const usersTable = new UsersTable(page)

    // 1. Contar cuántos Admin hay ANTES de aplicar el filtro
    const expectedAdminCount = await usersTable.countAdminRows()
    console.log('Admins antes del filtro:', expectedAdminCount)

    // 2. Aplicar el filtro por rol Admin
    await usersTable.filterByUserRoleAdmin('Admin')

    // 3. Validar que la tabla filtrada tenga esa misma cantidad, y que todas las filas sean Admin
    await usersTable.validateFilteredAdminRows(expectedAdminCount)
})

test('Filter by user Admin - validacion distinta', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.loginasAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SidePanelItems.Admin)

    const usersTable = new UsersTable(page)

    // Cantidad de Admin ANTES de filtrar
    const expectedAdminCount = await usersTable.countAdminRows()
    console.log('Admin Users before filtering: ', expectedAdminCount)

    // Aplica el filtro
    await usersTable.filterByUserRoleAdmin('Admin')

    // Validación 1 — el total de filas de la tabla coincide con el conteo previo de Admin
    await usersTable.validateTotalRowsCount(expectedAdminCount)

    // Validación 2 — no existe ninguna fila que NO sea Admin
    await usersTable.validateNoNonAdminRows()

})
