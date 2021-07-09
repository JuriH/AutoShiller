const customDevConsoleLog = require("../utils/customDevConsoleLog")
const logEnabled = 0

async function isTweetNotRTd(page) {

  const topHomeBanner = await page.$('div[data-testid="primaryColumn"] > div > div')
  const topHomeBannerBoundingBox = await topHomeBanner.boundingBox()
  const topHomeBannerHeight = topHomeBannerBoundingBox.height
  // console.log("topHomeBannerHeight: " + topHomeBannerHeight)

  const leftMenuBanner = await page.$('header[role="banner"]')
  const leftMenuBannerWidthBoundingBox = await leftMenuBanner.boundingBox()
  const leftMenuBannerWidth = leftMenuBannerWidthBoundingBox.width
  // console.log("leftMenuBannerWidth: " + leftMenuBannerWidth)

  const notRTd = await page.evaluate((leftMenuBannerWidth, topHomeBannerHeight) => {
    const timelineTopTweetElem = document.elementFromPoint(leftMenuBannerWidth + 1, topHomeBannerHeight + 1)
    return (timelineTopTweetElem.querySelector('div[data-testid="retweet"]') !== null)
  }, leftMenuBannerWidth, topHomeBannerHeight)

  customDevConsoleLog(notRTd, logEnabled)

  return notRTd
}

module.exports = isTweetNotRTd
