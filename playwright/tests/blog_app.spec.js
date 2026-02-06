import { describe, test, expect, beforeEach } from '@playwright/test'
import { loginWith, createBlog } from './helper'
import { assert } from 'node:console'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Antti Vainikka',
        username: 'anttvain',
        password: 'salasana'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText("Log in to application")
    await expect(locator).toBeVisible()
  })
})

describe('Login', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Antti Vainikka',
        username: 'anttvain',
        password: 'salasana'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('succeeds with correct credentials', async ({ page }) => {
    await loginWith(page, "anttvain", "salasana")
    await expect(page.getByText('Logged in as anttvain')).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await loginWith(page, "anttvain", "väärin")
    await expect(page.getByText('wrong credentials')).toBeVisible()
    await expect(page.getByText('Logged in as anttvain')).not.toBeVisible()
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Antti Vainikka',
        username: 'anttvain',
        password: 'salasana'
      }
    })

    await page.goto('http://localhost:5173')
    await loginWith(page, "anttvain", "salasana")
  })

  test('a new blog can be created', async ({ page }) => {
    const content = {
      title: 'Juuri luotu blogi',
      author: 'Testaaja Tessi',
      url: 'test.com'}
    await createBlog(page, content)
    await expect(page.getByText('Juuri luotu blogi')).toBeVisible()
  })
})

describe('When logged in with multiple blogs created', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Antti Vainikka',
        username: 'anttvain',
        password: 'salasana'
      }
    })

    await page.goto('http://localhost:5173')
    await loginWith(page, "anttvain", "salasana")
    await createBlog(page, {title: "eka", author: "first", url: "ichi"})
    await createBlog(page, {title: "toka", author: "second", url: "ni"})
    await createBlog(page, {title: "kolmas", author: "third", url: "san"})
  })

  test('a blog can be liked', async ({ page }) => {
    const thirdBlogELement = page.getByText("kolmas")
    await thirdBlogELement.getByRole("button", {name: "Expand"}).click()
    await page.getByRole("button", {name: "like"}).click()
    await expect(page.getByText('Likes 1')).toBeVisible()
  })

  test('a blog can be deleted', async ({ page }) => {
    const thirdBlogELement = page.getByText("kolmas")
    page.on('dialog', dialog => dialog.accept())
    await thirdBlogELement.getByRole("button", {name: "Delete"}).click()
    await expect(page.getByText('kolmas')).not.toBeVisible()
  })

  test('delete button is not shown for different user', async ({ page, request }) => {
    const thirdBlogELement = page.getByText("kolmas")
    await expect(thirdBlogELement.locator("text=Delete")).toBeVisible()
    await page.getByRole("button", { name: "Log out" }).click()
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Eri käyttäjä',
        username: 'Eri',
        password: 'yleinensana'
      }
    })
    await loginWith(page, "Eri", "yleinensana")
    await expect(page.locator("text=Delete")).not.toBeVisible()
  })

  test('blogs are listed based on like amount', async ({ page }) => {
    let blogELements = await page.locator("h3").allInnerTexts()
    expect(blogELements).toStrictEqual(['eka - firstExpandDelete','toka - secondExpandDelete','kolmas - thirdExpandDelete'])
    const thirdBlogELement = page.getByText("kolmas")
    await thirdBlogELement.getByRole("button", {name: "Expand"}).click()
    await page.getByRole("button", {name: "like"}).click()
    await page.waitForTimeout(1000)
    blogELements = await page.locator("h3").allInnerTexts()
    expect(blogELements).toStrictEqual(['kolmas - thirdHideDelete','eka - firstExpandDelete','toka - secondExpandDelete'])
  })
})