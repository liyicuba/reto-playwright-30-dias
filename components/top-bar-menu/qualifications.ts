import { Locator, Page } from '@playwright/test';

export class qualifications {

    readonly page: Page 
    readonly qualifications : Locator;
    readonly qualificationsOptions
    readonly skillsOption
    readonly educationOption

    constructor(page: Page) {
        this.page = page;
        this.qualifications = page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Qualifications');
        this.qualificationsOptions = page.getByRole('menuitem', {name: 'Qualifications'});
        this.skillsOption = page.getByRole('menuitem', {name: 'Skills'});
        this.educationOption = page.getByRole('menuitem', {name: 'Education'});
    }

    async clickOnQualifications() {
        await this.qualifications.click();
    }
     async clickOnSkills() {
        await this.clickOnQualifications();
        await this.skillsOption.click();
    }

    async clickOnEducation() {
        await this.clickOnQualifications();
        await this.educationOption.click();
    }

}