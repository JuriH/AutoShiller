const customDevConsoleLog = require("../utils/customDevConsoleLog")
const logEnabled = 0

async function belowEfficiency(a, b, minB, minPercentage) {

  if (b <= minB) { // If currentTagTotalTweets hasn't surpassed the minimum count
    customDevConsoleLog(`${minB - b} tweets before starting efficiency calculations`, logEnabled)
    return false
  }

  let percentage = (Math.floor((a / b) * 100)) // Divide currentTagTotalLikeAndRTs by currentTagTotalTweets and multiply by 100
  if (isNaN(percentage)) return false // Checking first tweet with the current tag so no statistics have been recorded
  console.log("Percentage: " + percentage)
  return (percentage <= minPercentage)
}

module.exports = belowEfficiency