const customInput = require("../utils/customInput")
const customWaitSelectorTimeout = require("../utils/customWaitSelectorTimeout")
const customKeyPresser = require("../utils/customKeyPresser")

const customDevConsoleLog = require("../utils/customDevConsoleLog")
const logEnabled = 0

async function searchTag(page, tag) {
  await customScreenshot(page, "searchTagWait")

  await customWaitSelectorTimeout(
    page,
    5000,
    "Waiting for Search-field",
    'input[data-testid="SearchBox_Search_Input"]',
    "Search-field found",
    "Was unable to find Search-field"
  )

  const inputValue = await page.$eval('input[data-testid="SearchBox_Search_Input"]', el => el.value);
  customDevConsoleLog(`InputValue: ${inputValue}`, logEnabled)
  if (inputValue.length > 0) {
    const input = await page.$('input[data-testid="SearchBox_Search_Input"]')
    await input.click({ clickCount: 3 })
    await page.keyboard.press("Backspace")
  }

  await customInput(
    page,
    'input[data-testid="SearchBox_Search_Input"]',
    tag,
    "Search tags entered"
  )

  await customKeyPresser(page, "Enter", "Executed search")

  if (
    await customWaitSelectorTimeout(
      page,
      5000,
      "Waiting for search results to load",
      `div[aria-label="Timeline: Search timeline"] div > div:nth-child(1)`,
      "Search results loaded",
      "Was unable to load search results"
    )
  ) {
    return true
  } else {
    return false
  }
}

module.exports = searchTag
