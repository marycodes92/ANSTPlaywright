import { Page } from '@playwright/test'

export class Login {
    constructor (page) {
        this.page = page
        this.username = page.getByPlaceholder('Username')
        this.password = page.locator('[data-test="password"]')
        this.loginButton = page.locator('#login-button')
    }

    async loginSteps(username, password) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }
}