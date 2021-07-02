async function customClicker(page, selector, consoleLog) {
  await page.click(selector)

  if (consoleLog !== "") console.log(consoleLog)
}

module.exports = customClicker
