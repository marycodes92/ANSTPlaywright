import { test, expect } from '@playwright/test';

test.only('Signup on Postdrop', async ({ context }) => {
    const page1 = await context.newPage();
    const inbox = 'anstp' + Math.floor(Math.random() * 10000);
    const email = `${inbox}@yopmail.com`;

    await page1.goto('https://yopmail.com/en/');
    await page1.fill('.ycptinput', inbox);
    await page1.keyboard.press('Enter');
    await page1.waitForLoadState('domcontentloaded');

    const page2 = await context.newPage();
    await page2.goto('https://app.postdrop.io/signup');
    await page2.fill('#name', 'Tester');
    await page2.fill('#company', 'Test Company');
    await page2.fill('#email', email);
    await page2.fill('#password', 'Test1234');
    await page2.click('#btn-signup');

    await page1.bringToFront();
    await page1.waitForTimeout(5000);

    await page1.locator('#refresh').click()

    const mailFrame = page1.frameLocator('#ifmail');

    const [confirmationPage] = await Promise.all([
        context.waitForEvent('page'),
        mailFrame.getByRole('link', { name: /verify|confirm/i }).click()
    ]);

    await confirmationPage.waitForLoadState('domcontentloaded');
    const confirmationText = await confirmationPage.getByText(/Sign Up Confirmed/i).textContent();
    expect(confirmationText).toBeTruthy();
});
