require("dotenv").config({path: "../.env"})

async function customScreenshot(page, name) {
  if (process.env.TAKE_SCREENSHOT === "1") {
    await page.screenshot({path: `./screenshots/${name}.png`})
    console.log("Screenshot with the name " + name + " taken")
  }
}

module.exports = customScreenshot
