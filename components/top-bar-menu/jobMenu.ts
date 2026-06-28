import { Locator, Page } from "@playwright/test";

export class jobMenu {

    readonly page: Page;
    readonly job : Locator;
    readonly jobTitlesOption
    readonly payGradesOption

    constructor(page: Page) {
        this.page = page;
        this.job = page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Job');
        this.jobTitlesOption = page.getByRole('menuitem', {name: 'Job Titles'});
        this.payGradesOption = page.getByRole('menuitem', {name: 'Pay Grades'});
    }

    async clickOnJob() {
        await this.job.click();
    }

    async clickOnJobTitles() {
        await this.clickOnJob();
        await this.jobTitlesOption.click();
    }

    async clickOnPayGrades() {
        await this.clickOnJob();
        await this.payGradesOption.click();
    }
}