const customClicker = require("../utils/customClicker")

async function likeTweet(page, index) {
  // Using index of 3 for the like-button as 'nth-child' starts from 1 instead of 0
  // 1 = Comment, 2 = Re-tweet, 3 = Like, 4 = Share
  try {
    await customClicker(
      page,
      `div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(${index + 1}) div[data-testid="like"]`,
      "Tweet liked"
    )
  } catch (err) {
    console.log(err)
  }
}

module.exports = likeTweet
