async function customInput(page, selector, toInput, consoleLog){
  await page.type(selector, toInput)
  if (consoleLog !== "") console.log(consoleLog)
}

module.exports = customInput