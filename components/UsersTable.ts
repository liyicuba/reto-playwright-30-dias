import { expect, Locator, Page } from "@playwright/test";


export class UsersTable {   

    readonly page: Page;

    constructor(page: Page) {

        this.page = page

    }

    private getAllBodyRows(): Locator {
        return this.page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    }

    private getAdminRows(): Locator {
        const allBodyRows = this.getAllBodyRows()
        const currentAdminRows = allBodyRows.filter({
            has: this.page.getByRole('cell').nth(2).getByText('Admin')
        })

        return currentAdminRows
        
    }

    private async getFirstAdminRow(): Promise<Locator> {
        const currentAdminRows = this.getAdminRows()
        const firstAdminSearch = currentAdminRows.nth(0)
        await expect(firstAdminSearch, "Admin user not found in the table").toHaveCount(1)    
        return firstAdminSearch
    }

    async EditFirstAdminOnTheTable() {
        const firstAdminToEdit = await this.getFirstAdminRow()
                
        await firstAdminToEdit 
        .locator('button')
        .filter({ has: this.page.locator('i.bi-pencil-fill') }).click()
    }

    private getESSRows(): Locator {
        const allBodyRows = this.getAllBodyRows()
        const currentESSRows = allBodyRows.filter({
            has: this.page.getByRole('cell').nth(2).getByText('ESS')
        })

        return currentESSRows
    }

    private async getFirstESSRow(): Promise<Locator> {
        const currentESSRows = this.getESSRows()
        const firstESSSearch = currentESSRows.nth(0)
        await expect(firstESSSearch, "ESS user not found in the table").toHaveCount(1)    
        return firstESSSearch
    }

    async EditESSOnTheTable() {
        const firstESSSearch = await this.getFirstESSRow()
        
        await firstESSSearch
        .locator('button')
        .filter({ has: this.page.locator('i.bi-pencil-fill') }).click()

    }

    async UserRoleDropdown(): Promise<Locator> {
        await this.page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
        return this.page.getByRole('listbox').getByRole('option')
    }
    
    async StatusDropdown(): Promise<Locator> {
        await this.page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div").click()
        return this.page.getByRole('listbox').getByRole('option')
    }

    async filterByUserRoleAdmin(role: string) {
        await this.page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
        await this.page.getByRole('listbox').getByRole('option', { name: role }).click()
        await this.page.getByRole('button', { name: 'Search' }).click()
    }

    async countAdminRows(): Promise<number> {
    return await this.getAdminRows().count()
    }

    async validateFilteredAdminRows(expectedCount: number) {
    const filteredRows = this.getAdminRows()
    
    await expect(filteredRows, `Expected ${expectedCount} Admin rows after filtering`).toHaveCount(expectedCount)

    for (let i = 0; i < expectedCount; i++) {
        await expect(filteredRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }
    }


    private getNonAdminRows(): Locator {
    return this.getAllBodyRows().filter({
        hasNot: this.page.getByRole('cell').nth(2).getByText('Admin')
    })
    }


    async validateTotalRowsCount(expectedCount: number) {
    await expect(this.getAllBodyRows(), `Expected ${expectedCount} total rows after filtering`).toHaveCount(expectedCount)
    }

    async validateNoNonAdminRows() {
    await expect(this.getNonAdminRows(), 'Found rows that are not Admin after filtering').toHaveCount(0)

    }

    async clickOnDeleteButton(username: string) {
    const allBodyRows = this.getAllBodyRows()
    const filteredRowsUsername = allBodyRows.filter({
        has: this.page.getByRole('cell').nth(1).getByText(username)
    })

    await expect(filteredRowsUsername, `User with username ${username} not found in the table`).toHaveCount(1)

    console.log(`Found user in table, deleting username: ${username}`)

    await filteredRowsUsername
        .locator('button')
        .filter({ has: this.page.locator('i.bi-trash') }).click()
    }

    async confirmDeleteUser() {
        await this.page.getByRole('button', { name: 'Yes, Delete' }).click()
    }

    async cancelDeleteUser() {
        await this.page.getByRole('button', { name: 'Cancel' }).click()
    }

    async userExistsInTable(username: string): Promise<boolean> {
        const filteredRowsUsername = this.getAllBodyRows().filter({
        has: this.page.getByRole('cell').nth(1).getByText(username)
        })
        const exists = await filteredRowsUsername.count() > 0
        console.log(`Checking if username "${username}" exists in table: ${exists}`)
        return exists
    }

}