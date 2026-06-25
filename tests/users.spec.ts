import {test, expect} from '@playwright/test'

test('get all the usernames registered', async ({page}) =>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()
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

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()
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

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()
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

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()
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



