import { expect, test } from '@playwright/test'

test('@OTHERS Login test', async ({page, context})=>{
    await page.goto('https://www.saucedemo.com/')

    // tagname#id or #id, tagname.class or .class, [attribute='value'], parentTagname childTagname
    //  text='value'
    
    await expect(page.locator('.form_input').nth(0)).toHaveAttribute('data-test','username')
    await page.locator('.form_input').first().fill('standard_user')
    await page.locator('[data-test="password"]').fill('secret_sauce')
    await page.locator('#login-button').click()
    await page.waitForTimeout(2000)
    const products = await page.locator('span:has-text("Products")').textContent()
    expect(products).toEqual('Products')


    // const page2 = await context.newPage()
    // await page2.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo')
    // await page.waitForLoadState('domcontentloaded', {timeout: 10000})
    // // await page.locator('a.followeasy', { hasText: 'Open URL'}).click()

    // await page.locator('#add-to-cart-sauce-labs-backpack').click()
})

test('@OTHERS handling dropdowns', async ({page})=>{
    await page.goto('https://ultimateqa.com/simple-html-elements-for-automation/')
    await page.locator('select').selectOption('volvo')

    const item = page.locator('[value="Bike"]')
    await item.click()
    await expect(item).toBeChecked()
})

// test.only('new tab', async ({page})=>{
//     await page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo')
//     await page.waitForLoadState('domcontentloaded', {timeout: 10000})
//     await page.locator('a.followeasy', { hasText: 'Open URL'}).click()

//     await page.pause()
// })