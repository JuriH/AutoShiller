const customClicker = require("../utils/customClicker")

async function reTweet(page, index) {
  // Using index of 2 for the retweet-button as 'nth-child' starts from 1 instead of 0
  // 1 = Comment, 2 = Re-tweet, 3 = Like, 4 = Share
  try {
    await customClicker(
      page,
      `div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(${index + 1}) div[data-testid="retweet"]`,
      "Tweet re-tweeted"
    )
  } catch (err) {
    console.log(err)
  }
}

module.exports = reTweet
