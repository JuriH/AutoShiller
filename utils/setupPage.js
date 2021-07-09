async function setupPage(page, cacheEnabled, deviceWidthPx, deviceHeightPx) {

  // Enable console.log inside page.evaluate() for testing purposes
  page.on("console", (consoleObj) => console.log(consoleObj.text()))

  await page.setCacheEnabled(cacheEnabled)
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  )
  await page.setViewport({ width: deviceWidthPx, height: deviceHeightPx }) // Smaller viewport makes websites sometime load a mobile version which may not have all the same elements as desktop one

  return page
}

module.exports = setupPage