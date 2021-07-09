async function isValidTweetFromPoint(page) {
  const topHomeBanner = await page.$('div[data-testid="primaryColumn"] > div > div')
  const topHomeBannerBoundingBox = await topHomeBanner.boundingBox()
  const topHomeBannerHeight = topHomeBannerBoundingBox.height
  // console.log("topHomeBannerHeight: " + topHomeBannerHeight)

  const leftMenuBanner = await page.$('header[role="banner"]')
  const leftMenuBannerWidthBoundingBox = await leftMenuBanner.boundingBox()
  const leftMenuBannerWidth = leftMenuBannerWidthBoundingBox.width
  // console.log("leftMenuBannerWidth: " + leftMenuBannerWidth)

  const validTweet = await page.evaluate((leftMenuBannerWidth, topHomeBannerHeight) => {
    const timelineTopTweetElem = document.elementFromPoint(leftMenuBannerWidth + 1, topHomeBannerHeight + 1)
    return (timelineTopTweetElem.tagName === "ARTICLE")
  }, leftMenuBannerWidth, topHomeBannerHeight)

  return validTweet
}

module.exports = isValidTweetFromPoint