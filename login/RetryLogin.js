const customWaitSelector = require("../utils/customWaitSelector")
const customInput = require("../utils/customInput")
const customClicker = require("../utils/customClicker")
const customScreenshot = require("../utils/customScreenshot")

// const querySelectorPromiseAny = require("../utils/querySelectorPromiseAny")

const customWaitSelectorTimeout = require("../utils/customWaitSelectorTimeout")

require("dotenv").config({path: "../.env"})

async function retryLogin(page, firstDetail, secondDetail, clearInputFields) {
  await customScreenshot(page, "retryLogin_emptyFields")

  // Clear email/username field
  await customInput(
    page,
    'input[name="session[username_or_email]"]',
    "",
    "Email / username / phone number field cleared"
  )

  // Clear password field
  await customInput(
    page,
    'input[name="session[password]"]',
    "",
    "Password field cleared"
  )

  console.log("Input fields cleared")

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

  await customScreenshot(page, "RetryLogin_fieldsFilled")

  // Wait until Login-button is enabled
  await customWaitSelector(
    page,
    'div[data-testid="LoginForm_Login_Button"]:not([disabled])',
    "Login button enabled"
  )

  await customClicker(
    page,
    'div[data-testid="LoginForm_Login_Button"]:not([disabled])',
    "Login button clicked"
  )

  let loginStatus = await querySelectorPromiseAny(
    page,
    5000,
    [
      'div[data-testid="LoginForm_Login_Button"]:not([disabled])',
      "invalidLoginDetails",
    ],
    ['div[aria-label="Timeline: Your Home Timeline"]', "loggedIn"]
  )

  console.log("LoginStatus: " + await loginStatus)

  // If logging in failed, try it again with username instead of email address
  if (loginStatus !== "loggedIn") return false

  return true
}

module.exports = retryLogin
