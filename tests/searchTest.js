const puppeteer = require("puppeteer")
const searchTag = require("../search/SearchTag")
const customWaitSelectorTimeout = require("../utils/customWaitSelectorTimeout")
const Login = require("../login/Login")
const customScreenshot = require("../utils/customScreenshot")
const getCurrentSearchTag = require("../search/getCurrentSearchTag")

let browser, page
let searchTagIndex = 0
const deviceWidth = 1920
const deviceHeight = 1080

const searchTags = [
  "$HAPPY",
  "$Happy",
  "$happy",
  "#HappyCoin",
  "#happycoin",
  "#HAPPYCOIN",
  "@the_happy_coin",
]

async function searchTest() {
  // Launch browser
  browser = await puppeteer.launch({
    headless: true,
  })

  page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  )
  await page.setViewport({width: deviceWidth, height: deviceHeight})

  // Enable console.log inside page.evaluate() for testing purposes
  page.on("console", (consoleObj) => console.log(consoleObj.text()))

  await page.goto("https://twitter.com/login")

  // Login with different login details if necessary
  if (!(await Login(page, process.env.TWITTER_EMAIL, process.env.TWITTER_PASS)))
    // Login with email
    await Login(page, process.env.TWITTER_USER, process.env.TWITTER_PASS) // Login with username

  // Wait for frontpage to load before taking screenshot
  await customWaitSelectorTimeout(
    page,
    5000,
    "Waiting for frontpage to load",
    'div[aria-label="Timeline: Your Home Timeline"] > div > div:nth-child(1)',
    "Frontpage loaded"
  )

  if (!(await searchTag(page, searchTags[searchTagIndex]))) return

  await customScreenshot(page, "tagSearched")

  // A condition, for example too many already liked & re-tweeted tweets, change to another tag

  const currentSearchTag = await getCurrentSearchTag(page)
  console.log("Current seach tag: " + currentSearchTag)

  if (searchTags.indexOf(currentSearchTag) === searchTags.length - 1){ // If at last tag, go to first one
    searchTagIndex = 0
  } else {
    searchTagIndex++
  }

  console.log("Search tag index: " + searchTagIndex)

  await browser.close()
}

searchTest()
