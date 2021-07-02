async function getTweetRTCount(tweet) {
  const reTweetsCount = await tweet.querySelector(
    'div[role="group"] div[data-testid="unretweet"], div[data-testid="retweet"] span'
  ).textContent

  console.log("Re-tweets on tweet: " + reTweetsCount)
  return reTweets
}

module.exports = getTweetRTCount
