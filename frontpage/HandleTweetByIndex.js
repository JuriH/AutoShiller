const getTweetText = require("../readTweetData/getTweetText")
const customScrollIntoView = require("../utils/customScrollIntoView")
const likeAndRTOnMatch = require("../frontpage/likeAndRTOnMatch")

const minHeightPx = 10 // For detecting empty tweets

async function handleTweetByIndex(page, selector, index, tags) {
  try {
    console.log("Fetching tweet at index " + index)

    let tweet = await page.evaluate(
      (selector, index, minHeightPx) => {
        const tweetOffsetHeight = document.querySelector(selector)
          .childNodes[index].offsetHeight

        console.log("TweetOffsetHeight: " + tweetOffsetHeight)

        if (
          tweetOffsetHeight === null ||
          tweetOffsetHeight === undefined ||
          tweetOffsetHeight <= minHeightPx
        )
          return false

        return true // Non-empty tweet
      },
      // Variables below are passed to the page.evaluate()
      selector,
      index,
      minHeightPx
    )

    if (tweet) {
      await customScrollIntoView(page, selector, index)
      let tweetText = await getTweetText(page, selector, index)
      await likeAndRTOnMatch(page, selector, index, tweetText, tags)
      return true
    } else {
      return false
    }

    // Handle errors in page.evaluate() here
  } catch (err) {
    console.log(err)

    // Out of indexes, waiting for new tweet(s) to load
    return false
  }
}

module.exports = handleTweetByIndex
