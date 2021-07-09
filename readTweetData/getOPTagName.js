async function getOPTagName(page) {
  // let profileTag = tweet
  //   .querySelectorAll(
  //     'div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(3) span'
  //   )[5]
  //   .textContent()

  // if (profileTag.substring(0, 1) !== "@") {
  //   profileTag = tweet.querySelectorAll(
  //     'div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(3) span'
  //   )[6].textContent
  // }

  // return profileTag

  const topHomeBanner = await page.$('div[data-testid="primaryColumn"] > div > div')
  const topHomeBannerBoundingBox = await topHomeBanner.boundingBox()
  const topHomeBannerHeight = topHomeBannerBoundingBox.height
  // console.log("topHomeBannerHeight: " + topHomeBannerHeight)

  const leftMenuBanner = await page.$('header[role="banner"]')
  const leftMenuBannerWidthBoundingBox = await leftMenuBanner.boundingBox()
  const leftMenuBannerWidth = leftMenuBannerWidthBoundingBox.width
  // console.log("leftMenuBannerWidth: " + leftMenuBannerWidth)

  const tagNameOP = await page.evaluate((leftMenuBannerWidth, topHomeBannerHeight) => {
    try {
      const timelineTopTweetElem = document.elementFromPoint(leftMenuBannerWidth + 1, topHomeBannerHeight + 1)
      const nthLinkElem = timelineTopTweetElem.querySelectorAll('a[role="link"]')[1]
      return nthLinkElem.getAttribute("href")
    } catch (err){
      return null
    }
  }, leftMenuBannerWidth, topHomeBannerHeight)

  return tagNameOP
}

module.exports = getOPTagName
