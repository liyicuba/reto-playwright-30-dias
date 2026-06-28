import { Page } from '@playwright/test';
import { userManagementMenu } from './userManagementMenu';
import { jobMenu } from './jobMenu';
import { organization } from './organization';
import { qualifications } from './qualifications';

export class TopBarMenu {

    readonly page: Page;    
    readonly userManagement: userManagementMenu;
    readonly job: jobMenu;
    readonly organization: organization;       
    readonly qualifications: qualifications; 

    constructor(page: Page) {
        this.page = page;
        this.userManagement = new userManagementMenu(page);
        this.job = new jobMenu(page);
        this.organization = new organization(page);
        this.qualifications = new qualifications(page);
    }
}

