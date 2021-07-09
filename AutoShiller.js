const puppeteer = require("puppeteer")

const setupPage = require("./utils/setupPage")

const Login = require("./login/Login")
const CreateLogFile = require("./storage/CreateLogFile")

const customWaitSelectorTimeout = require("./utils/customWaitSelectorTimeout")

const { TagIndexHolder } = require("./TagIndexHolder")

const checkIfUpdateSearch = require("./search/checkIfUpdateSearch")
const searchTag = require("./search/SearchTag")

const getTweetText = require("./readTweetData/getTweetText")
const ifHandleTweet = require("./handleTweet/ifHandleTweet")
const isTweetNotLiked = require("./readTweetData/isTweetNotLiked")
const isTweetNotRTd = require("./readTweetData/isTweetNotRTd")
const getTweetUrl = require("./readTweetData/getTweetUrl")
const logTweet = require("./storage/logTweet")

const pickRandomNumberInRange = require("./utils/pickRandomNumberInRange")

const customDevConsoleLog = require("./utils/customDevConsoleLog")
const logEnabled = 1

require("dotenv").config({ path: ".env" })

const logFilePath = process.env.LOG_FILE_PATH

let browser, page

// For dynamic delays between each tweet
const minDelayMs = 500
const maxDelayMs = 1000

// // Statistics for changing between search tags; If X% tweets already liked and re-tweeted with current tag, change to another tag
let currentTagTotalTweets = 0
let currentTagTotalLikeAndRTs = 0
const minTotalTweetsForCalc = 10 // After X amount of tweets start calculating % of how many tweets have been new or matching
const minEfficiencyPercentage = 25

// To load desktop version of Twitter; Some resolutions load mobile version with no Search-field
const deviceWidthPx = 1920
const deviceHeightPx = 1080
const cacheEnabled = false

let handleTweets = true // To help switching between tags only every second time

const tags = ["@the_happy_coin", "#HappyCoin", "$HAPPY", "#HappyMerch"]

let tagIndexHolder = new TagIndexHolder() // Holds tagIndex variable

const selectorSearchTimeline = 'div[aria-label="Timeline: Search timeline"]'

/**
 * Actual function starts here
 */

async function start() {
  await CreateLogFile(logFilePath) // Creates log file automatically with not found

  // Launch browser
  browser = await puppeteer.launch({
    headless: false,
  })

  page = await browser.newPage()
  setupPage(page, cacheEnabled, deviceWidthPx, deviceHeightPx)

  await page.goto("https://twitter.com/login")

  // Login with different login details if necessary
  if (!(await Login(page, process.env.TWITTER_EMAIL, process.env.TWITTER_PASS)))
    // Login with email
    await Login(page, process.env.TWITTER_USER, process.env.TWITTER_PASS) // Login with username

  await searchTag(page, tags[tagIndexHolder.getTagIndex()])

  await customWaitSelectorTimeout(
    page,
    "Waiting for tweets to load",
    `${selectorSearchTimeline} > div > div:nth-child(10)`,
    "Tweets loaded successfully",
    "Failed to load tweets"
  )

  while (handleTweets) {
    try {
      // console.log("TagIndex: " + tagIndexHolder.getTagIndex())

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, Number(pickRandomNumberInRange(minDelayMs, maxDelayMs))) // Pick random whole number in range for a delay between tweets
      })

      let updateSearch = await checkIfUpdateSearch(
        // Handle switching tabs and changing tags
        page,
        tags,
        tagIndexHolder,
        currentTagTotalTweets,
        currentTagTotalLikeAndRTs,
        minTotalTweetsForCalc,
        minEfficiencyPercentage
      )

      if (updateSearch) {
        await page.keyboard.press("KeyJ")

        currentTagTotalTweets = 0
        currentTagTotalLikeAndRTs = 0
      }

      // Handle tweets here

      // Check if tweet should be handled or not
      const tweetText = await getTweetText(page)
      const tweetStatus = await ifHandleTweet(
        page,
        tweetText,
        tags,
        `/${process.env.TWITTER_USER}`,
        "/the_happy_coin"
      )
      if (tweetStatus !== "ok") throw `${tweetStatus}`

      let logThisTweet = false // Determine if to log the tweet or not

      if (await isTweetNotLiked(page)) {
        console.log("Liking")
        await page.keyboard.press("KeyL") // Press L to like current tweet
        logThisTweet = true
      } else {
        console.log("Tweet already liked")
      }

      if (await isTweetNotRTd(page)) {
        console.log("Re-tweeting")
        await page.keyboard.press("KeyT") // Open re-tweeting menu

        await customWaitSelectorTimeout(
          page,
          2000,
          "Waiting for re-tweeting menu to appear",
          'div[role="menuitem"]',
          "Re-tweeting menu appeared",
          "Re-tweeting menu didn't appear"
        )

        await page.keyboard.press("Enter")

        await new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 500)
        })

        if (!logThisTweet) logThisTweet = true
      } else {
        console.log("Tweet already re-tweeted")
      }

      if (logThisTweet) {
        const tweetUrl = await getTweetUrl(page)
        await logTweet(logFilePath, tweetUrl) // Log tweet to a text file in the given path
      }
    } catch (err) {
      customDevConsoleLog("ERR: " + err, logEnabled)
      if (
        !(
          err === "invalidTweet" ||
          err === "unableToGetTweetText" ||
          err === "notMatchingTweet" ||
          err === "oldTweet" ||
          err === "invalidOP"
        )
      ) {
        handleTweets = false // Exit loop
      }

      if (err === "invalidTweet" && currentTagTotalTweets > 0) {
        currentTagTotalTweets-- // Don't count invalid tweets towards the efficiency
      }
    } finally {
      currentTagTotalTweets++

      await page.keyboard.press("KeyJ")
    }
  }

  console.log("Exiting code")

  await browser.close()
}

start()
