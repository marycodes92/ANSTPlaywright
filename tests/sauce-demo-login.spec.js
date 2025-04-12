import { expect, test } from '@playwright/test'
import { Login } from '../page-objects/Login'
const { data } = require('../helper/data.json')

test.describe('Login Module', () => {
    
    let login
    test.beforeEach(async({page})=>{
        login = new Login(page)
        await page.goto('/')
    })
    
    test('@UITEST Login with valid credentials', async ({page})=>{
        await expect(page.locator('.form_input').nth(0)).toHaveAttribute('data-test','username')
        await login.loginSteps(data.validCredentials.username, data.validCredentials.password)
        await page.waitForTimeout(1000)
        const products = await page.locator('span:has-text("Products")').textContent()
        expect(products).toEqual('Products')
    })

    test('@UITEST Login as a locked_out_user', async ({page})=>{
        await login.loginSteps(data.blockedUser.username, data.blockedUser.password)
        const errorMsg = await page.getByText('Epic sadface: Sorry, this user has been locked out.').isVisible()
        expect(errorMsg).toBeTruthy()
    })
})
