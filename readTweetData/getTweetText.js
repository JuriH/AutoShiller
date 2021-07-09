const customDevConsoleLog = require("../utils/customDevConsoleLog")
const logEnabled = 0

async function getTweetText(page) {

  const topHomeBanner = await page.$('div[data-testid="primaryColumn"] > div > div')
  const topHomeBannerBoundingBox = await topHomeBanner.boundingBox()
  const topHomeBannerHeight = topHomeBannerBoundingBox.height
  // console.log("topHomeBannerHeight: " + topHomeBannerHeight)

  const leftMenuBanner = await page.$('header[role="banner"]')
  const leftMenuBannerWidthBoundingBox = await leftMenuBanner.boundingBox()
  const leftMenuBannerWidth = leftMenuBannerWidthBoundingBox.width
  // console.log("leftMenuBannerWidth: " + leftMenuBannerWidth)

  let tweetText = ""
  tweetText = await page.evaluate((leftMenuBannerWidth, topHomeBannerHeight) => {
    const timelineTopTweetElem = document.elementFromPoint(leftMenuBannerWidth + 1, topHomeBannerHeight + 1)

    let elems

    try {
      elems = Array.from(timelineTopTweetElem.querySelector('div[lang]').children)
    } catch (err) {
      return "unableToGetTweetText"
    }

    let text = ""

    elems.forEach((elem) => {
      if (elem.parentElement.tagName !== "A") // Ignore spans that are child elements of A-tag (usually contain only "http://" while the parent A-element contains whole link(s))
        text += elem.textContent
    })

    text = text.replace(/\s\s+/g, ' ')

    return text

  }, leftMenuBannerWidth, topHomeBannerHeight)

  customDevConsoleLog("TweetText: " + "\"" + tweetText + "\"", logEnabled)

  return tweetText.toLowerCase()
}

module.exports = getTweetText
