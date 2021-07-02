const fs = require("fs")
const dateFormat = require("dateformat")
const readFromFile = require("./readFromFile")
const md5File = require("md5-file")
require("dotenv").config("../.env")

const customDevConsoleLog = require("../utils/customDevConsoleLog")
const logEnabled = true

let md5Previous = null
let fsWait = false
let fsTimeoutMs = 2000
let fsPollingRateMs = 100

async function appendFile(path, textToAppend) {
  fs.appendFile(path, textToAppend, function (err) {
    if (err) {
      customDevConsoleLog(
        `Error occurred when logging tweet: ${err}" `,
        logEnabled
      )
      return false
    }
  })

  return
}

async function logTweet(path, url) {
  // Store timestamp for example as '14:52:00 30/06/2021'
  const textToAppend =
    "\n" + dateFormat(Date.now(), "HH:MM:ss dd/mm/yyyy") + " " + url // Append tweet URL with detailed timestamp to the log file

  // Code from https://thisdavej.com/how-to-watch-for-files-changes-in-node-js/
  const watcher = fs.watch(path, (event, filename) => {
    if (filename) {

      // To set a polling rate for the watcher
      if (fsWait) return true // File changed
      fsWait = setTimeout(() => {
        fsWait = false
      }, fsPollingRateMs)

      const md5Current = md5File(path)
      if (md5Previous !== null && md5Previous !== md5Current){
        console.log("File changed!")
        fsWait = null
        watcher.close()
        return true
      }
    }
  })

  md5Previous = md5File(path) // Store MD5 of log file before modifications

  // Add tweet's URL to text file
  if (await appendFile(path, textToAppend)) {
    const checkArray = await readFromFile(path)
    console.log(checkArray)

    fsWait = setTimeout(() => {
      customDevConsoleLog("Failed to log tweet", logEnabled)
      watcher.close()
      return false
    }, fsTimeoutMs)
  }
}

module.exports = logTweet
