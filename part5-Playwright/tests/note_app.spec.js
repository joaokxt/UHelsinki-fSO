const { test, expect, describe } = require('@playwright/test')
const { before, beforeEach, afterEach } = require('node:test')
const { DefaultDeserializer } = require('v8')

describe('Note app', () => {
    beforeEach(async ({ page, request}) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Joao Terck',
                username: 'joaokxt',
                password: '12345'
            }
        })
        
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note App, Department of Computer Science, University of Helsinki. 2024')).toBeVisible()
    })

    test('Login form can be opened', async({ page }) => {
        await page.getByRole('button', { name: 'Log-in'}).click()
        await page.getByTestId('username').fill('joaokxt')
        await page.getByTestId('password').fill('12345')
        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByText('dev logged-in')).toBeVisible()
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'Log-in'}).click()
            await page.getByTestId('username').fill('joaokxt')
            await page.getByTestId('password').fill('12345')
            await page.getByRole('button', { name: 'Login' }).click()
        })

        test('A new note can be created', async({ page }) => {
            await page.getByRole('button', { name: 'New note' }).click()
            await page.getByTestId('new-note').fill('Note created by Playwright')
            await page.getByRole('button', { name: 'Save' }).click()
            await expect(page.getByText('Note created by Playwright')).toBeVisible()
        })
    })
})