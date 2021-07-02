async function customWaitSelector(page, logBefore, selector, logAfter) {
  try {
    if (logBefore !== null) console.log("CustomWaitSelector: " + logBefore)
    await page.waitForSelector(selector)
    if (logAfter !== null) console.log("CustomWaitSelector: " + logAfter)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = customWaitSelector
