const ifTweetContainsGivenTags = require("../readTweetData/ifTweetContainsGivenTags")

const getTweetLikeStatus = require("../readTweetData/getTweetLikeStatus")
const likeTweet = require("../doActionOnTweet/likeTweet")

const getTweetRTStatus = require("../readTweetData/getTweetRTStatus")
const reTweet = require("../doActionOnTweet/reTweet")

async function likeAndRTOnMatch(page, selector, index, tweetText, tags) {

  console.log("Tags received in 'likeAndRTOnMatch: " + tags)
  // Check if tweet contains desired tags
  if (await ifTweetContainsGivenTags(tweetText, tags)) {
    console.log("Tweet contains given tags")

    // Check if tweet has already been liked and re-tweeted
    if (!(await getTweetLikeStatus(page, index)))
      await likeTweet(page, index)
    if (!(await getTweetRTStatus(page, index)))
      await reTweet(page, index)
  } else {
    console.log("Tweet didn't contain given tags")
  }
}

module.exports = likeAndRTOnMatch
