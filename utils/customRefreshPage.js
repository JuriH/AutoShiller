const customWaitSelectorTimeout = require("./customWaitSelectorTimeout")

async function customRefreshPage(
  page,
  timeoutMs,
  logBefore,
  selector,
  logAfterSuccess,
  logAfterFailed
) {
  await page.reload()
  await customWaitSelectorTimeout(
    page,
    timeoutMs,
    logBefore,
    selector,
    logAfterSuccess,
    logAfterFailed
  )
  await page.waitForSelector(selector, {timeout: timeoutMs})
}

module.exports = customRefreshPage
