async function customWaitSelectorTimeout(page, timeoutMs, logBefore, selector, logAfterSuccess, logAfterFailed) {
  try {
    if (logBefore !== null) console.log("CustomWaitSelector: " + logBefore)
    await page.waitForSelector(selector, {timeout: timeoutMs})
    if (logAfterSuccess !== null) console.log("CustomWaitSelector: " + logAfterSuccess)
    return true
  } catch (err) {
    console.log("CustomWaitSelector: " + logAfterFailed)
    console.log(err)
    return false
  }
}

module.exports = customWaitSelectorTimeout
