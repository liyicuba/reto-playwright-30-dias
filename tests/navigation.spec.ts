import {test, expect} from '@playwright/test';

test('Check left menu items options', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    const LeftMenuItems = page.getByLabel('sidepanel').getByRole('listitem')
    const currentMenuItemscount = await LeftMenuItems.count()
    console.log('Current menu items count', currentMenuItemscount)

    const currentMenuItemText :string[] = []

     for (let i = 0; i < currentMenuItemscount; i++) {
        const menuItem =  LeftMenuItems.nth(i)
        const menuText = await menuItem.innerText()
        currentMenuItemText.push(menuText)
     }

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


})

test('Navigate through left menu items', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    const LeftMenuItems = page.getByLabel('sidepanel').getByRole('listitem')
    const currentMenuItemscount = await LeftMenuItems.count()
    //console.log('Current menu items count', currentMenuItemscount)

    //const currentMenuItemText :string[] = []

    for (let i = 0; i < currentMenuItemscount; i++) {

        const menuItem =  LeftMenuItems.nth(i)
        
        const menuText = await menuItem.innerText()

        console.log('current menu item text', menuText)

         /*if (menuText === 'Maintenance') {
        await page.getByRole('button', {name: 'Cancel'}).click();
        continue;
    }*/
   if (menuText === 'Maintenance') {
    await menuItem.click()
    await page.getByRole('button', { name: 'Cancel' }).click()
    await page.waitForLoadState('networkidle').catch(() => {})
    continue
}


}

     
    

       
});
   

   
