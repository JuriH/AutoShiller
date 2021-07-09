const customDevConsoleLog = require("./customDevConsoleLog")
const logEnabled = 0

async function customWaitSelector(page, logBefore, selector, logAfter) {
  try {
    if (logBefore !== null) customDevConsoleLog(logBefore, logEnabled)
    await page.waitForSelector(selector)
    if (logAfter !== null) customDevConsoleLog(logAfter, logEnabled)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = customWaitSelector
