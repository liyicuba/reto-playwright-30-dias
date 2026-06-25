import { Locator, Page } from '@playwright/test';
import { SidePanelItems } from './SidePanel';

export class SearchInput {

    readonly page: Page;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = this.page.locator('aside nav input');
    }

    private menuOption(option: SidePanelItems): Locator {
        return this.page.getByRole('link', { name: option });
    }

    async clickOnOption(option: SidePanelItems) {
        await this.menuOption(option).click();
    }

    async searchOption(option: SidePanelItems) {
        await this.searchInput.fill(option);
    }

    async getVisibleMenuOptions(): Promise<string[]> {
        const links = this.page.locator('aside nav a');
        const count = await links.count();
        const options: string[] = [];

        for (let i = 0; i < count; i++) {
            const text = (await links.nth(i).innerText()).trim();
            if (text) options.push(text);
        }

        return options;
    }

    async searchAndValidate(option: SidePanelItems): Promise<void> {
        await this.searchOption(option);
        const visibleOptions = await this.getVisibleMenuOptions();
        const found = visibleOptions.some(o => o.toLowerCase().includes(option.toLowerCase()));
  
    }
}