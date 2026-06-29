import {test, expect} from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage';
import { SidePanel, SidePanelItems } from '../components/SidePanel';



test('get all the usernames registered', async ({page}) =>{

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()

    await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('User Management').click()
    await page.getByRole('menuitem', {name: 'Users'}).click()
    
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


})

test('get all the Employees registered', async ({page}) =>{

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()

    await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('User Management').click()
    await page.getByRole('menuitem', {name: 'Users'}).click()
    
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

test('Select specific user for edition', async ({page}) =>{

    const userForEdition = 'teamseven'

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()

    await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('User Management').click()
    await page.getByRole('menuitem', {name: 'Users'}).click()

    const pencilIcon = page
     .getByRole('table')
     .getByRole('row')
     .filter({hasText: userForEdition})
     .locator('button')
     .filter({has: page.locator('i.bi-pencil-fill')})

     await pencilIcon.click()

    const currentUsername = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input").inputValue()
    expect(currentUsername).toBe(userForEdition)

})

test('Select random user different from Admin and validate', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()

    await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('User Management').click()
    await page.getByRole('menuitem', {name: 'Users'}).click()

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
});

test('Check user role options', async ({page}) => {

    const expectedRoleOPtions= ['-- Select --', 'Admin', 'ESS']

    const loginPage = new LoginPage(page)
    await loginPage.loginasAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SidePanelItems.Admin)

    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    const currentUserRoleOptions= await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentUserRoleOptions)

    expect(currentUserRoleOptions, 'The options displayed in the user Role dropdown do not match the expected options').toEqual(expectedRoleOPtions)
    
    


});

test ('Check Status Options displayed', async ({page})  => {
     
    const expectedStatusOptions = ['-- Select --', 'Enabled', 'Disabled']

    const loginPage = new LoginPage(page)
    await loginPage.loginasAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SidePanelItems.Admin)
    
    await page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div").click()
    const currentStatusOptions= await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentStatusOptions)

    expect(currentStatusOptions, 'The option for Status dropdown do not match').toEqual(expectedStatusOptions)



});

test ('Filter by user Admin', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginasAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SidePanelItems.Admin)

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    //Filas que contienen el role admin
    const currentAdminRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    })

    const expectedAdminCount = await currentAdminRows.count()
    console.log('Admin Users before filtering: ', expectedAdminCount)

    //Aplica el filtro
    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    await page.getByRole("listbox").getByRole('option', {name: 'Admin'}).click()
    await page.getByRole('button', {name: 'Search'}).click()

    //tabla filtrada deberia tener la misma cantidad de users filtrados antes
    await expect(allBodyRows).toHaveCount(expectedAdminCount)

    for (let i=0; i<expectedAdminCount; i++){
        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }

})

test ('Filter by user Admin - validacion distinta', async ({page}) => {

   const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row');

    // Filas que contienen el role Admin antes de filtrar
    const currentAdminRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    });

    const expectedAdminCount = await currentAdminRows.count();
    console.log('Admin Users before filtering: ', expectedAdminCount);

    // Aplica el filtro
    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click();
    await page.getByRole('listbox').getByRole('option', { name: 'Admin' }).click();
    await page.getByRole('button', { name: 'Search' }).click();

    // Validación 1 — cantidad de filas coincide con el conteo previo
    await expect(allBodyRows).toHaveCount(expectedAdminCount);

    // Validación 2 — no existe ninguna fila que NO sea Admin
    const nonAdminRows = allBodyRows.filter({
        hasNot: page.getByRole('cell').nth(2).getByText('Admin')
    });
    await expect(nonAdminRows).toHaveCount(0);

})
