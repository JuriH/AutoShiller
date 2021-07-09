async function isTweetNotLiked(page) {

  const topHomeBanner = await page.$('div[data-testid="primaryColumn"] > div > div')
  const topHomeBannerBoundingBox = await topHomeBanner.boundingBox()
  const topHomeBannerHeight = topHomeBannerBoundingBox.height
  // console.log("topHomeBannerHeight: " + topHomeBannerHeight)

  const leftMenuBanner = await page.$('header[role="banner"]')
  const leftMenuBannerWidthBoundingBox = await leftMenuBanner.boundingBox()
  const leftMenuBannerWidth = leftMenuBannerWidthBoundingBox.width
  // console.log("leftMenuBannerWidth: " + leftMenuBannerWidth)

  const notLiked = await page.evaluate((leftMenuBannerWidth, topHomeBannerHeight) => {
    const timelineTopTweetElem = document.elementFromPoint(leftMenuBannerWidth + 1, topHomeBannerHeight + 1)
    return (timelineTopTweetElem.querySelector('div[data-testid="like"]') !== null)
  }, leftMenuBannerWidth, topHomeBannerHeight)

  return notLiked
}

module.exports = isTweetNotLiked
