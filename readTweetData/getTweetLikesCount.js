async function getTweetLikesCount(tweet) {

  const likesCount = tweet.querySelector(
    'div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(2) div[role="group"] div[data-testid="like"], div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(2) div[role="group"] div[data-testid="unlike"]'
  ).textContent
  
  return likesCount
}

module.exports = getTweetLikesCount
