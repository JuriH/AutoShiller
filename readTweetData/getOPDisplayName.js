async function getOPDisplayName(tweet) {
  const displayName = tweet
    .querySelectorAll("div:nth-child(3) a")[2]
    .getAttribute("href")

  return displayName
}

module.exports = getOPDisplayName
