async function getOPTagName(tweet) {
  let profileTag = tweet
    .querySelectorAll(
      'div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(3) span'
    )[5]
    .textContent()

  if (profileTag.substring(0, 1) !== "@") {
    profileTag = tweet.querySelectorAll(
      'div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(3) span'
    )[6].textContent
  }

  return profileTag
}

module.exports = getOPTagName
