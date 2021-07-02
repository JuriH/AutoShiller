const customWaitSelector = require("./customWaitSelector")

async function customGetNodesList(page, selector) {
  await customWaitSelector(page, selector, "")

  const nodesList = await page.evaluate(() => {
    return document.querySelector(selector).childNodes
  })

  return await nodesList
}

module.exports = customGetNodesList
