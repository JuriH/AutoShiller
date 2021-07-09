const customWaitSelector = require("../utils/customWaitSelector")
const customWaitSelectorTimeout = require("../utils/customWaitSelectorTimeout")
const customInput = require("../utils/customInput")
const customClicker = require("../utils/customClicker")

require("dotenv").config({ path: "../.env" })

const timeoutMs = 2000

async function login(page, firstDetail, secondDetail) {
  try {
    // Wait for Login page to load
    await customWaitSelectorTimeout(
      page,
      2000,
      "Waiting for login form to load",
      'input[name="session[username_or_email]"]',
      "Successfully found login-form",
      "Was unable to find login-form"
    )

    /**
     * Clear login form if needed
     */

    // Clear email/username field if needed
    if (
      await page.evaluate(() => {
        document.querySelector('input[name="session[username_or_email]"]')
          .textContent.length > 0
      })
    ) {
      await customInput(
        page,
        'input[name="session[username_or_email]"]',
        "",
        "Email/username field cleared"
      )
    }

    // Clear password field if needed
    if (
      await page.evaluate(() => {
        document.querySelector('input[name="session[password]"]').textContent
          .length > 0
      })
    ) {
      await customInput(
        page,
        'input[name="session[password]"]',
        "",
        "Password field cleared"
      )
    }

    /**
     * Fill out login form
     */

    // Username/email
    await customInput(
      page,
      'input[name="session[username_or_email]"]',
      firstDetail,
      "Email / username / phone number entered"
    )

    // Password
    await customInput(
      page,
      'input[name="session[password]"]',
      secondDetail,
      "Password entered"
    )

    // Wait until Login-button is enabled
    await customWaitSelector(
      page,
      "Waiting for Login button to be enabled",
      'div[data-testid="LoginForm_Login_Button"]:not([disabled])',
      "Login button enabled"
    )

    await customClicker(
      page,
      'div[data-testid="LoginForm_Login_Button"]:not([disabled])',
      "Login button clicked"
    )

    // Check if login is successful and loads frontpage, or fails and loads login page with error

    let mappedSelectors = [
      page.waitForSelector('header[role="banner"]', { timeout: timeoutMs }), // Successful login
      page.waitForSelector("form", { timeout: timeoutMs }), // Failed login
    ].map((currentValue, index) => currentValue.then((result) => [index]))

    const loginStatus = await Promise.race(mappedSelectors)
      .then((value) => {
        if (Number(value) === 0) return true // Because code above returns index number as Object, have to use Number() to convert it to regular number
        return false
      })
      .catch((err) => {})

    return loginStatus
  } catch (err) {}
}

module.exports = login
