const customWaitSelector = require("../utils/customWaitSelector")
const customWaitSelectorTimeout = require("../utils/customWaitSelectorTimeout")
const customInput = require("../utils/customInput")
const customClicker = require("../utils/customClicker")
const customScreenshot = require("../utils/customScreenshot")

require("dotenv").config({path: "../.env"})

async function login(page, firstDetail, secondDetail) {
  await customScreenshot(page, "loginEmpty")

  // Wait for Login page to load
  await customWaitSelector(
    page,
    "Waiting for login form to load",
    'form',
    "Login form loaded"
  )

  await customScreenshot(page, "loginScreen")

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

  await page.screenshot({path: "./screenshots/loginFilled.png"})

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

  await customScreenshot(page, "x")

  let loginStatus = await customWaitSelectorTimeout(
    page,
    5000,
    "Waiting for frontpage",
    'div[aria-label="Skip to recommended content"]',
    "Successfully logged in",
    "Failed to log in"
  )

  console.log("LoginStatus: " + loginStatus)

  // If logging in failed, try it again with username instead of email address
  if (loginStatus !== "loggedIn") return false

  return true
}

module.exports = login
