const { test, expect, describe } = require('@playwright/test')

describe('Note app', () => {
    test('front page can be opened', async({ page }) => {
        await page.goto('https://localhost:5173')
    
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note App, Department of Computer Science, University of Helsinki. 2024')).toBeVisible()
    })
})