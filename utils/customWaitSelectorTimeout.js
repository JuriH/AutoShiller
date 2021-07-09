const customDevConsoleLog = require("./customDevConsoleLog")
const logEnabled = 0

async function customWaitSelectorTimeout(page, timeoutMs, logBefore, selector, logAfterSuccess, logAfterFailed) {
  try {
    if (logBefore !== null) customDevConsoleLog(logBefore, logEnabled)
    await page.waitForSelector(selector, {timeout: timeoutMs})
    if (logAfterSuccess !== null) customDevConsoleLog(logAfterSuccess, logEnabled)
    return true
  } catch (err) { // When waitForSelector() times out
    customDevConsoleLog(logAfterFailed + "\n" + err, logEnabled)
    return false
  }
}

module.exports = customWaitSelectorTimeout
