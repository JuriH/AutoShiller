const customDevConsoleLog = require("./customDevConsoleLog")
const logEnabled = 1

async function customClicker(page, selector, consoleLog) {
  await page.click(selector)

  if (consoleLog !== "") customDevConsoleLog(consoleLog, logEnabled)
}

module.exports = customClicker
