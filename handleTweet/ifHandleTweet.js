const isValidTweetFromPoint = require("../handleTweet/isValidTweetFromPoint")
const ifTweetContainsGivenTags = require("./ifTweetContainsGivenTags")
const getOPTagName = require("../readTweetData/getOPTagName")

async function ifHandleTweet(page, tweetText, tags, neverHandleOP, alwaysHandleOP) {

  let tweetStatus = "ok"

  if (!(await isValidTweetFromPoint(page))) return "invalidTweet"

  const opTagName = await getOPTagName(page)
  if (opTagName === alwaysHandleOP) return tweetStatus // If OP is someone that doesn't use tags in their tweet
  if (opTagName === neverHandleOP) return "invalidOP"

  if (!(await ifTweetContainsGivenTags(tweetText, tags))) return "notMatchingTweet"

  return tweetStatus
}

module.exports = ifHandleTweet