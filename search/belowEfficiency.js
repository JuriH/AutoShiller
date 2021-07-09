const customDevConsoleLog = require("../utils/customDevConsoleLog")
const logEnabled = 1

async function belowEfficiency(totalLikesAndRTs, totalTweets, minTotalTweetsBeforeCalc, minPercentageBeforeSwitch) {

  console.log("a: " + totalLikesAndRTs + ", b: " + totalTweets + ", minB: " + minTotalTweetsBeforeCalc + ", minPercentage: " + minPercentageBeforeSwitch)

  if (totalTweets <= minTotalTweetsBeforeCalc) { // If currentTagTotalTweets hasn't surpassed the minimum count
    customDevConsoleLog(`${minTotalTweetsBeforeCalc - totalTweets} tweets before starting efficiency calculations`, logEnabled)
    return false
  }

  let percentage = (Math.floor((totalLikesAndRTs / (totalTweets - minTotalTweetsBeforeCalc)) * 100)) // Divide currentTagTotalLikeAndRTs by currentTagTotalTweets and multiply by 100
  if (isNaN(percentage)) return false // Checking first tweet with the current tag so no statistics have been recorded
  console.log("Percentage: " + percentage)
  return (percentage <= minPercentageBeforeSwitch)
}

module.exports = belowEfficiency