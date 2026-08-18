import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { SidePanel, SidePanelItems } from '../components/SidePanel';
import { SearchInput } from '../components/SearchInput';
import { Environment } from '../config/Environment';
import { AddNewUserPage } from '../pageobjects/AddNewUserPage'
import { Navigate } from '../pageobjects/Navigate';
import { UsersTable } from '../components/UsersTable';
import { UserFactory } from '../factory/UserFactory';


test('Login OrangeHRM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

   
    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);
     
    
})

test('Search on SidePanel', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin()

    const searchInput = new SearchInput(page);
    await searchInput.searchAndValidate(SidePanelItems.Admin);
})


test('Login as Employee OrangeHRM', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasEmployee();

    await expect(page.getByRole('link', {name: 'Admin'})).not.toBeVisible()

    

})

test('Invalid Login OrangeHRM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithWrongCredentials();

    await expect(page.getByText('Invalid credentials')).toBeVisible()
})

test('Crear un nuevo usuario', async ({ page }) => {

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

})

test('Crear un nuevo usuario con distinta contraseña', async ({ page }) => {

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

})

test('Crear un nuevo usuario Admin con contraseña incorrecta', async ({ page }) => {

    
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

})

test('Crear un nuevo usuario Admin', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const navigate = new Navigate(page);
    await navigate.toUsers();

    const usersTable = new UsersTable(page);
    await usersTable.EditFirstAdminOnTheTable();

    const addNewUserPage = new AddNewUserPage(page);
    const fullUserToSearch = await addNewUserPage.getEmployeeName();

    const adminUser = UserFactory.createAdmin ({
         employeeName: fullUserToSearch
    })

    await page.goBack()
    await addNewUserPage.addNewUser(adminUser);
    await addNewUserPage.checkToastMessage();

})

test('Reto 21 - Delete un usuario Admin', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const navigate = new Navigate(page);
    await navigate.toUsers();

    const usersTable = new UsersTable(page);
    await usersTable.EditFirstAdminOnTheTable();

    const addNewUserPage = new AddNewUserPage(page);
    const fullUserToSearch = await addNewUserPage.getEmployeeName();

    const adminUser = UserFactory.createAdmin ({
         employeeName: fullUserToSearch
    })

    await page.goBack()
    await addNewUserPage.addNewUser(adminUser);
    await addNewUserPage.checkToastMessage();

    //ACT
    await usersTable.clickOnDeleteButton(adminUser.username);
    await usersTable.confirmDeleteUser();

    //Assert
    await addNewUserPage.checkDeleteToastMessage();

    //Valida que ya no exista el usuario en la tabla
    const userStillExists = await usersTable.userExistsInTable(adminUser.username);
    expect(userStillExists, `User ${adminUser.username} should not exist after deletion`).toBe(false);


})


test('Crear un nuevo usuario ESS', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SidePanelItems.Admin);

    const usersTable = new UsersTable(page);
    await usersTable.EditESSOnTheTable();

    const addNewUserPage = new AddNewUserPage(page);
    const fullUserToSearch = await addNewUserPage.getEmployeeName();
   
    const employeeESSUser = UserFactory.createEmployeeESS({
         employeeName: fullUserToSearch
    })

    await page.goBack()
    await addNewUserPage.addNewUser(employeeESSUser);
    await addNewUserPage.checkToastMessage();


})



test('Reto 21 - Cancelar Delete de un usuario Admin', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginasAdmin();

    const navigate = new Navigate(page);
    await navigate.toUsers();

    const usersTable = new UsersTable(page);
    await usersTable.EditFirstAdminOnTheTable();

    const addNewUserPage = new AddNewUserPage(page);
    const fullUserToSearch = await addNewUserPage.getEmployeeName();

    const adminUser = UserFactory.createAdmin({
         employeeName: fullUserToSearch
    })

    await page.goBack()
    await addNewUserPage.addNewUser(adminUser);
    await addNewUserPage.checkToastMessage();

    //ACT
    await usersTable.clickOnDeleteButton(adminUser.username);
    await usersTable.cancelDeleteUser();

    //Assert
    const userStillExists = await usersTable.userExistsInTable(adminUser.username);
    expect(userStillExists, `User ${adminUser.username} should still exist after cancelling deletion`).toBe(true);

})