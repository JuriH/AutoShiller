const belowEfficiency = require("./belowEfficiency")
const switchBetweenTopAndLatest = require("../search/switchBetweenTopAndLatest")
const searchTag = require("../search/SearchTag")
const customDevConsoleLog = require("../utils/customDevConsoleLog")
const logEnabled = 0

async function checkForRetryError(page) {
  const retryError = await page.evaluate(() => {
    if (
      document.querySelector(
        'div[aria-label="Timeline: Search timeline"] > div > div:nth-child(2)'
      ) === null // Tweet hasn't been re-tweeted yet as element with "unretweet" can be found
    ) {
      return true
    } else {
      return false
    }
  })

  customDevConsoleLog(`RetryError: ${retryError}`, logEnabled)

  return retryError
}

async function checkIfUpdateSearch(
  page,
  tags,
  tagIndexHolder,
  currentTagTotalTweets,
  currentTagTotalLikeAndRTs,
  minTotalTweetsForCalc,
  minEfficiencyPercentage
) {
  // Either Retry-error or enough already liked and re-tweeted tweets on timeline
  if ((await checkForRetryError(page)) || currentTagTotalTweets === 25) {
    // 25 for testing purposes

    // await belowEfficiency(currentTagTotalLikeAndRTs, currentTagTotalTweets,  minTotalTweetsForCalc, minEfficiencyPercentage)

    const topTabWasActive = await switchBetweenTopAndLatest(page) // Always change the tab
    if (!topTabWasActive) {
      // Changed from Latest to Top-tab

      tagIndexHolder.updateTagIndex()

      console.log("Current tag: " + tags[tagIndexHolder.getTagIndex()])

      await searchTag(page, tags[tagIndexHolder.getTagIndex()]) // Change tag only when changing back to Top-tab
    }

    return true
  }

  return false
}

module.exports = checkIfUpdateSearch
