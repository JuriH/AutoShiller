const puppeteer = require("puppeteer")
const Login = require("./login/Login")
const customWaitSelector = require("./utils/customWaitSelector")
const customScreenshot = require("./utils/customScreenshot")
const HandleTweetByIndex = require("./frontpage/HandleTweetByIndex")
const customRefreshPage = require("./utils/customRefreshPage")
const CreateLogFile = require("./storage/CreateLogFile")

require("dotenv").config({path: ".env"})

let browser, page

// For looping through tweets
let index = 0 // Used for selecting and scrolling to a tweet
let currentRetries = 0
const maxRetries = 5
const pageRefreshWaitMs = 5000

let testIndex = 0
const maxTestIndex = 5

let handleTweets = true

const tags = [
  "$HAPPY",
  "$Happy",
  "$happy",
  "#HappyCoin",
  "#happycoin",
  "#HAPPYCOIN",
  "@the_happy_coin"
]

async function start() {

  // Create log file for tracking and/or statistics
  await CreateLogFile("./twitterLog.txt")

  // Launch browser
  browser = await puppeteer.launch({
    headless: true,
  })

  // Open Twitter
  page = await browser.newPage()

  // Enable console.log inside page.evaluate()
  page.on("console", (consoleObj) => console.log(consoleObj.text()))

  await page.goto("https://twitter.com/login")

  // Login with different login details if necessary
  if (!(await Login(page, process.env.TWITTER_EMAIL, process.env.TWITTER_PASS)))
    await Login(page, process.env.TWITTER_USER, process.env.TWITTER_PASS)

  // Wait for frontpage to load before taking screenshot
  await customWaitSelector(
    page,
    "Waiting for frontpage to load",
    'div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(1)',
    "Frontpage loaded"
  )

  await customScreenshot(page, "frontpage")

  /**
   * Returns true if tweet successfully handled, false if waiting for new tweets to load. Page refresh on nth false
   */
  while (testIndex < maxTestIndex) {
    testIndex++
    setTimeout(() => {}, 1000)

    if (
      await HandleTweetByIndex(
        page,
        'div[aria-label="Timeline: Your Home Timeline"] > div',
        index,
        tags
      )
    ) {
      // Matching or non-matching tweet found
      if (currentRetries > 0) currentRetries = 0 // Reset retries counter
      index++
    } else {
      // Couldn't get current tweet, waiting X ms for new one to load at current index
      currentRetries++
    }

    // Was unable to load new tweet(s) for enough many times, refreshing page
    if (currentRetries === maxRetries) {
      currentRetries = 0
      index = 0
      const pageRefreshResult = await customRefreshPage(
        page,
        pageRefreshWaitMs,
        "Refreshing page for new tweets",
        'div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(1)',
        "Page successfully refreshed",
        "Something went wrong refreshing the page; Unable to find first tweet"
      )

      // If unable to get first tweet after page refresh
      if (!pageRefreshResult) handleTweets = false // Exit code, failed to load new tweets in time after page refresh
    } else {
      console.log("Waiting for new tweet(s) to load")
      setTimeout(() => {}, 2000)
    }
  }

  console.log("Exiting code")

  await browser.close()
}

start()
