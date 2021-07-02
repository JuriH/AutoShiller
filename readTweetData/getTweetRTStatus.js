async function getTweetRTStatus(page, index) {
  try {
    await page.evaluate((index) => {
      if (
        document.querySelector(
          `div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(${
            index + 1
          }) div[data-testid="retweet"]`
        ) !== null
      )
        return true
    }, index)
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = getTweetRTStatus
