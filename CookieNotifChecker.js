async function cookieNotifChecker(page) {
  // Click to allow the use of cookies
  const cookieNotif = await page.evaluate(() => {
    return document.querySelector('div[role="button"]')
  })

  if (cookieNotif !== null || cookieNotif !== undefined)
    await page.$eval('div[role="button"]', (elem) => elem.click())
}

module.exports = cookieNotifChecker
