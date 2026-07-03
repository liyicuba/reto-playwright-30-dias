import { Page, Locator, expect } from '@playwright/test';
import { Environment } from '../config/Environment';    

export class AddNewUserPage {

    readonly page: Page
    readonly addButton: Locator
    readonly userRoleDropdown: Locator
    readonly userRoleOption: Locator
    readonly employeeNameField: Locator
    readonly usernameInput: Locator
    readonly statusDropdown: Locator  
    readonly statusDropdownOption: Locator  
    readonly passwordFields: Locator
    readonly confirmPasswordField: Locator
    readonly saveButton: Locator
    readonly toastMessage: Locator
    readonly wrongPasswordFields: Locator
    readonly errorPasswordMessage: Locator


    constructor(page: Page) {
        this.page = page;
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.userRoleDropdown = page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div");
        this.userRoleOption = page.getByRole('listbox').getByRole('option', { name: 'ESS' });
        this.employeeNameField = page.getByRole('textbox', { name: 'Type for hints...' });
        this.usernameInput = page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div//input");
        this.statusDropdown = page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div");
        this.statusDropdownOption = page.getByRole('listbox').getByRole('option', { name: 'Enabled' });
        this.passwordFields = page.locator("//label[contains(.,'Password')]/parent::div/following-sibling::div//input");
        this.confirmPasswordField = page.locator("//label[contains(.,'Confirm Password')]/parent::div/following-sibling::div//input");
        this.wrongPasswordFields = page.locator("//label[contains(.,'Password')]/parent::div/following-sibling::div//input");
        this.errorPasswordMessage = page.locator("//div[contains(@class, 'user-password-row')]//span[contains(@class, 'error')]");

        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.toastMessage = page.locator('p.oxd-text--toast-message');
    }
async clickOnAddButton(){

        await this.addButton.click();

}

async selectUserRole(){
        await this.userRoleDropdown.click();
        await this.userRoleOption.click();

}

async fillEmployeeName(){
        const employeeNameField = this.employeeNameField;
        await employeeNameField.click();
        await employeeNameField.fill('Test')
        await this.page.waitForTimeout(1000);

        // Esperar que aparezca el listbox de sugerencias
        const suggestions = this.page.getByRole('listbox').getByRole('option');
        await suggestions.first().waitFor();

        // Seleccionar la primera opción
        await suggestions.first().click();
}

async selectStatus(){
        await this.statusDropdown.click()
        await this.statusDropdownOption.click();
}

async fillUsername(){
        const usernameField = this.usernameInput;
        await usernameField.click();
        await usernameField.fill(Environment.EMPLOYEE_USERNAME + crypto.randomUUID().slice(0, 5)); // Generar un nombre de usuario único
}

async fillPassword(){
        const passwordFields = this.passwordFields;
        await passwordFields.nth(0).fill(Environment.EMPLOYEE_PASSWORD); // Password
        await passwordFields.nth(1).fill(Environment.EMPLOYEE_PASSWORD); // Confirm Password
}
async fillwrongPassword(){
        const passwordFields = this.passwordFields;
        await passwordFields.nth(0).fill(Environment.EMPLOYEE_PASSWORD); // Password
        await passwordFields.nth(1).fill(Environment.EMPLOYEE_PASSWORD + crypto.randomUUID().slice(0, 5)); // Confirm Password
}

async saveUser(){
        await this.saveButton.click()
        
}

async checkToastMessage(){
        await expect(this.toastMessage).toHaveText('Successfully Saved')

}

async addNewUser(){

    await this.clickOnAddButton();
    await this.selectUserRole();
    await this.fillEmployeeName();
    await this.selectStatus();
    await this.fillUsername();
    await this.fillPassword();
    await this.saveUser();

}

async addNewUserWithWrongPassword(){

    await this.clickOnAddButton();
    await this.selectUserRole();
    await this.fillEmployeeName();
    await this.selectStatus();
    await this.fillUsername();
    await this.fillwrongPassword();
    await this.saveUser();

}

async checkErrorPasswordMessage(){
    await expect(this.errorPasswordMessage).toHaveText('Passwords do not match')
}


}