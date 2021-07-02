async function ifTweetContainsGivenTags(tweetText, tags) {

  let bool = false

  tags.some((tag) => {
    if (tweetText.includes(tag)) {
      console.log("Tag '" + tag + "' found in tweet's text")
      bool = true
      return true
    }
  })

  return bool
}

module.exports = ifTweetContainsGivenTags