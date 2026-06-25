import { Locator, Page} from '@playwright/test';

export class SidePanel {

    readonly page: Page;

    constructor(page: Page) {
    this.page = page;

    }

    private menuOption(option: SidePanelItems): Locator {
        return this.page.getByRole('link', {name: option}).getByText(option)
    }

    async clickOnOption(option: SidePanelItems){
        await this.menuOption(option).click()

    }
 

}

export enum SidePanelItems {
    Admin = 'Admin',
    PIM = 'PIM', 
    Leave = 'Leave',
    Time = 'Time',
    Recruitment = 'Recruitment',
    MyInfo = 'My Info',
    Performance = 'Performance',
    Dashboard = 'Dashboard',
    Directory = 'Directory', 
    Maintenance = 'Maintenance',
    Claim = 'Claim',
    Buzz = 'Buzz'
}   
