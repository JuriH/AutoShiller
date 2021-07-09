// const fs = require("fs")
const fs = require("fs")
const { promisify } = require("util")
const appendFile = promisify(fs.appendFile)
const dateFormat = require("dateformat")

async function logTweet(path, url) {
  // Store timestamp for example as '14:52:00 30/06/2021'
  const textToAppend =
    "\n" + dateFormat(Date.now(), "HH:MM:ss dd/mm/yyyy") + " " + url // Append tweet URL with detailed timestamp to the log file

  await appendFile(path, textToAppend, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Appended successfully")
    }
  })
}

module.exports = logTweet
