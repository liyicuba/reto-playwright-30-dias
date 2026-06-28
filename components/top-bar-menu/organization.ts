import { Locator, Page } from '@playwright/test';

export class organization {

    readonly page: Page 
    readonly organization : Locator;
    readonly organizationOptions
    readonly generalInformationOption
    readonly locationsOption

    constructor(page: Page) {
        this.page = page;
        this.organization = page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Organization');
        this.organizationOptions = page.getByRole('menuitem', {name: 'Organization'});
        this.generalInformationOption = page.getByRole('menuitem', {name: 'General Information'});
        this.locationsOption = page.getByRole('menuitem', {name: 'Locations'});
    }

    async clickOnOrganization() {
        await this.organization.click();
    }

    async clickOnGeneralInformation() {
        await this.clickOnOrganization();
        await this.generalInformationOption.click();
    }

    async clickOnLocations() {
        await this.clickOnOrganization();
        await this.locationsOption.click();
    }


}

