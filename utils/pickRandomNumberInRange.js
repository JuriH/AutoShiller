const customDevConsoleLog = require("../utils/customDevConsoleLog")
const logEnabled = 0

function pickRandomNumberInRange(minValue, maxValue) {
  let value = (Math.floor(Math.random() * maxValue + minValue))
  customDevConsoleLog("Random timeout in ms: " + value, logEnabled)
  return value
}

module.exports = pickRandomNumberInRange