import { Locator, Page } from "@playwright/test";

export class userManagementMenu {

        readonly page: Page;
        readonly userManagement : Locator;
        readonly usersOption : Locator;
        readonly addButton : Locator

    
        constructor(page: Page) {
            this.page = page;
            this.userManagement = page.getByRole('navigation', {name: 'Topbar menu'}).getByText('User Management')
            this.usersOption = page.getByRole('menuitem', {name: 'Users'})
            this.addButton = page.getByRole('button', {name: 'Add'})
    
        }


        async clickOnUserManagement() {
            await this.userManagement.click();
        }   

        async clickOnUsers() {
            await this.clickOnUserManagement();
            await this.usersOption.click();
        }   

        async addingNewEmployee(){
            await this.clickOnUsers()
            await this.addButton.click()
            await this.page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click();
            await this.page.getByRole('listbox').getByRole('option', { name: 'ESS' }).click();

            const employeeNameInput = this.page.getByRole('textbox', { name: 'Type for hints...' });
            await employeeNameInput.click();
            await employeeNameInput.fill('lin');

         // Esperar que aparezca el listbox de sugerencias
            const suggestions = this.page.getByRole('listbox').getByRole('option');
            await suggestions.first().waitFor();

        // Seleccionar la primera opción
            await suggestions.first().click();

            await this.page.getByRole('button', { name: 'Search' }).click();

        }
    }