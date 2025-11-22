import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the hero section with title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Explore the World of')
    await expect(page.locator('h1')).toContainText('Craft Beer')
  })

  test('should display the search input', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search beers"]')
    await expect(searchInput).toBeVisible()
  })

  test('should display popular search tags', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'IPA' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Stout' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Lager' })).toBeVisible()
  })

  test('should display statistics', async ({ page }) => {
    await expect(page.getByText('500+')).toBeVisible()
    await expect(page.getByText('Craft Beers')).toBeVisible()
    await expect(page.getByText('150+')).toBeVisible()
    await expect(page.getByText('Breweries')).toBeVisible()
  })

  test('should allow typing in search input', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search beers"]')
    await searchInput.fill('IPA')
    await expect(searchInput).toHaveValue('IPA')
  })

  test('should have a search button', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: 'Search' })
    await expect(searchButton).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('should have the header visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
  })

  test('should have the footer visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()
  })
})

test.describe('Beer Grid', () => {
  test('should display beer cards', async ({ page }) => {
    await page.goto('/')
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    // Check that beer cards are rendered
    const beerCards = page.locator('[class*="card"]')
    await expect(beerCards.first()).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Theme Toggle', () => {
  test('should have theme toggle button', async ({ page }) => {
    await page.goto('/')
    // Look for theme toggle button (sun/moon icon)
    const themeToggle = page.locator('button').filter({ has: page.locator('svg') })
    await expect(themeToggle.first()).toBeVisible()
  })
})
