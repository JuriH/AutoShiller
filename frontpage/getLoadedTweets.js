const customWaitSelector = require("../utils/customWaitSelector")
const customScreenshot = require("../utils/customScreenshot")

async function getLoadedTweets(page) {
  // Get all tweets into an array

  // let tweetNodes = () => {
  //   return page.evaluate(async () => {
  //     return await new Promise((resolve) => {
  //       resolve(
  //         document.querySelectorAll(
  //           'div[aria-label="Timeline: Your Home Timeline"] > div > div'
  //         )
  //       )
  //     })
  //   })
  // }

  await customWaitSelector(
    page,
    "Waiting for feed to load",
    'div[data-testid="primaryColumn"] div[aria-label="Timeline: Your Home Timeline"] > div',
    "Feed loaded"
  )

  await customScreenshot(page, "feedLoaded")

  // let tweetNodes = await page.evaluate(async () => {
  //   let arr = Array.from(
  //     document.querySelector(
  //       'div[data-testid="primaryColumn"] div[aria-label="Timeline: Your Home Timeline"] > div'
  //     ).children
  //   )

  //   return arr
  // })

  // let tweetNodes = await page.$$(
  //   document.querySelector(
  //     'div[data-testid="primaryColumn"] div[aria-label="Timeline: Your Home Timeline"] > div'
  //   ).children
  // )

  let tweetNodes = await page.evaluate(() => {
    let elements = Array.from(
      document.querySelectorAll('div[data-testid="primaryColumn"] div[aria-label="Timeline: Your Home Timeline"] > div')[0].children
    )

    console.log(elements.length)
    // let links = elements.map((element) => {
    //   return element.href
    // })
    return elements
  })

  for (let i = 0; i < tweetNodes.length; i++) {
    console.log(tweet)
  }

  console.log(tweetNodes.length)

  // let tweetNodes = []

  // await page.evaluate(async () => {
  //   let arr = Array.from(
  //     document.querySelector(
  //       'div[aria-label="Timeline: Your Home Timeline"] > div'
  //     ).childNodes
  //   )

  //   tweetNodes.forEach(item => {
  //     tweetNodes.push(item)
  //   })
  // })

  // console.log(tweetNodes.length)

  // console.log("test")

  // await page.evaluate(() => {
  //   let arr = document.querySelectorAll(
  //     'div[aria-label="Timeline: Your Home Timeline"] > div > div'
  //   )

  //   return arr
  // })

  // let tweetsArray = []
  // tweetNodes.forEach((tweet) => {
  //   if (tweet.offsetHeight > 1) tweetsArray.push(tweet) // Remove tweet elements with no content
  // })

  // console.log("Found " + tweetsArray.length + " tweets loaded on the frontpage")
  return tweetNodes
}

module.exports = getLoadedTweets
