async function getTweetCommentCount(tweet) {

  const commentsCount = tweet.querySelector('div[role="group"] div[data-testid="reply"] span').textContent

  console.log("Comments on tweet: " + commentsCount)
  return comments
}

module.exports = getTweetCommentCount
