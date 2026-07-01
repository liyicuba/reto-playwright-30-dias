import { Locator, Page } from '@playwright/test';
import { Environment } from '../config/Environment';

export class LoginPage {

    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }


    async doLogin(username: string, password: string) {
        await this.page.goto('/web/index.php/auth/login');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginasAdmin() {
        await this.doLogin(Environment.ADMIN_USERNAME, Environment.ADMIN_PASSWORD);
    }

    async loginasEmployee() {
     
        await this.doLogin(Environment.EMPLOYEE_USERNAME, Environment.EMPLOYEE_PASSWORD);
    }

    async loginWithWrongCredentials() {
        await this.doLogin(Environment.EMPLOYEE_USERNAME, Environment.WRONG_PASSWORD);
    }

    async nuevoEmployee(){

        await this.page.getByRole('button', { name: 'Add' }).click();
        await this.page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click();
        await this.page.getByRole('listbox').getByRole('option', { name: 'ESS' }).click();

        const employeeNameInput = this.page.getByRole('textbox', { name: 'Type for hints...' });
        await employeeNameInput.click();
        await employeeNameInput.fill('Test')
        await this.page.waitForTimeout(1000);

        // Esperar que aparezca el listbox de sugerencias
        const suggestions = this.page.getByRole('listbox').getByRole('option');
        await suggestions.first().waitFor();

        // Seleccionar la primera opción
        await suggestions.first().click();
        await this.page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div").click()
        await this.page.getByRole('listbox').getByRole('option', { name: 'Enabled' }).click();

        const usernameInput = this.page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div//input")
        await usernameInput.fill(Environment.EMPLOYEE_USERNAME + crypto.randomUUID().slice(0, 5)); // Generar un nombre de usuario único

        const passwordFields = this.page.locator("//label[contains(.,'Password')]/parent::div/following-sibling::div//input")
        await passwordFields.nth(0).fill(Environment.EMPLOYEE_PASSWORD); // Password
        await passwordFields.nth(1).fill(Environment.EMPLOYEE_PASSWORD); // Confirm Password
            
        await this.page.getByRole('button', {name: 'Save'}).click()
        
        }

    async nuevowrongEmployee(){

        await this.page.getByRole('button', { name: 'Add' }).click();
        await this.page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click();
        await this.page.getByRole('listbox').getByRole('option', { name: 'ESS' }).click();

        const employeeNameInput = this.page.getByRole('textbox', { name: 'Type for hints...' });
        await employeeNameInput.click();
        await employeeNameInput.fill('Test')
        await this.page.waitForTimeout(1000);

        // Esperar que aparezca el listbox de sugerencias
        const suggestions = this.page.getByRole('listbox').getByRole('option');
        await suggestions.first().waitFor();

        // Seleccionar la primera opción
        await suggestions.first().click();
        await this.page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div").click()
        await this.page.getByRole('listbox').getByRole('option', { name: 'Enabled' }).click();

        const usernameInput = this.page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div//input")
        await usernameInput.fill(Environment.EMPLOYEE_USERNAME + crypto.randomUUID().slice(0, 5)); // Generar un nombre de usuario único

        const passwordFields = this.page.locator("//label[contains(.,'Password')]/parent::div/following-sibling::div//input")
        await passwordFields.nth(0).fill(Environment.EMPLOYEE_PASSWORD); // Password
        await passwordFields.nth(1).fill(Environment.EMPLOYEE_PASSWORD + crypto.randomUUID().slice(0, 5)); // Confirm Password
            
       // await this.page.getByRole('button', {name: 'Save'}).click()
        
        }

}