const customDevConsoleLog = require("./customDevConsoleLog")
const logEnabled = 0

async function customInput(page, selector, toInput, consoleLog){
  await page.type(selector, toInput)
  if (consoleLog !== "") customDevConsoleLog(consoleLog, logEnabled)
}

module.exports = customInput