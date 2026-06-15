import {test, expect} from '@playwright/test';

test('Navigate to Admin Page', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()
    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    const LeftMenuItems = await page.getByLabel('sidepanel').getByRole('listitem')
    const currentMenuItemscount = await LeftMenuItems.count()
    console.log('Current menu items count', currentMenuItemscount)

    const currentMenuItemText :string[] = []

    for (let i = 0; i < currentMenuItemscount; i++) {

        const menuItemText = await LeftMenuItems.nth(i).innerText()
        currentMenuItemText.push(menuItemText)
    }
    console.log('Current menu items text', currentMenuItemText)

        const expectedMenuItems = [
            'Admin',
            'PIM', 
            'Leave', 
            'Time', 
            'Recruitment',
            'My Info',
            'Performance',
            'Dashboard',
            'Directory', 
            'Maintenance',
            'Claim',
            'Buzz']   

    expect(currentMenuItemText).toEqual(expectedMenuItems)

    console.log('First menu item text', currentMenuItemText[0])
    expect(currentMenuItemText[0]).toEqual("Admin")

});

