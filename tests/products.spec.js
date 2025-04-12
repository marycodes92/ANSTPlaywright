import { test, expect } from '@playwright/test'
import { Login } from '../page-objects/Login'

test.describe('Products Module', ()=>{
  test.beforeEach(async ({ page }) => {
    let login = new Login(page)
    await page.goto('/')
    await login.loginSteps('standard_user', 'secret_sauce')
    await page.waitForTimeout(1000)
  })

  test('@UITEST Dynamically Add item to cart and verify product', async ({page})=>{
    const product = 'Sauce Labs Fleece Jacket'
    const productLists = page.locator('.inventory_item')
    const productCount = await productLists.count()

    for (let i = 0; i < productCount; ++i) {
      const productName = await productLists.nth(i).locator('.inventory_item_label a').textContent()
      if (productName === product) {
        await productLists.nth(i).getByRole('button', {name: 'Add to cart'}).click()
      }
    }
    
    await page.locator('.shopping_cart_link').click()
    const cartProduct = await page.locator('.cart_item a').innerText()
    expect(cartProduct).toEqual(product)
  })
})