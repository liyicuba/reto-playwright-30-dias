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

        
        if (menuText === 'Maintenance') {
        await menuItem.click()
        await page.getByRole('button', { name: 'Cancel' }).click()
        await page.waitForLoadState('networkidle').catch(() => {})
        continue
        }
    }
})
     
test('Check all the qualifications links', async ({page}) => {

    
    const expectedPages = [
        {Menu:'Skills',
         url: '/web/index.php/admin/viewSkills'  
        },

        {Menu: 'Education',
         url: '/web/index.php/admin/viewEducation'
        },
        {Menu: 'Licenses',
        url: '/web/index.php/admin/viewLicenses'
        }
        ]  

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()
    await page.getByRole('link', {name: 'Admin'}).click()
    await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Qualifications').click()

    const qualificationOptions = page.getByRole('menu').locator('li')
    const qualificationOptionsCount = await qualificationOptions.count()

    for (let expectedPage of expectedPages) {
        const menuOption = qualificationOptions.filter({hasText: expectedPage.Menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))
        await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Qualifications').click()


    }

       
});

test('Check all the Organization links', async ({page}) => {

    
    const expectedPages = [
        {Menu:'General Information',
         url: '/web/index.php/admin/viewOrganizationGeneralInformation'  
        },

        {Menu: 'Locations',
         url: '/web/index.php/admin/viewLocations'
        },
        {Menu: 'Structure',
        url: '/web/index.php/admin/viewCompanyStructure'
        }
        ]  

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()
    await page.getByRole('link', {name: 'Admin'}).click()
    await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Organization').click()

    const organizationOptions = page.getByRole('menu').locator('li')
    const organizationOptionsCount = await organizationOptions.count()

    for (let expectedPage of expectedPages) {
        const menuOption = organizationOptions.filter({hasText: expectedPage.Menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))
        await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Organization').click()


    }

       
});