const customClicker = require("../utils/customClicker")

async function switchBetweenTopAndLatest(page) {

  const topTabWasActive = await page.evaluate(() => {
    if (document.querySelector('div[role="tablist"] > div:nth-child(1) > a > div > div').offsetHeight > 0) return true // Top-tab already active
    return false // Latest-tab active
  })

  console.log("Top-tab was active: " + topTabWasActive)

  if (topTabWasActive) {
    await customClicker(page, 'div[role="tablist"] > div:nth-child(2) > a > div', "Switching to Latest tweets") // Active Latest-tab
  } else {
    await customClicker(page, 'div[role="tablist"] > div:nth-child(1) > a > div', "Switching to Top tweets") // Active Top-tab
  }

  return topTabWasActive
}

module.exports = switchBetweenTopAndLatest