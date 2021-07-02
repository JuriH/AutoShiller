const fs = require("fs")
const readline = require("readline")
const customDevConsoleLog = require("../utils/customDevConsoleLog")
const writeToFile = require("./writeToFile")
const logEnabled = true

const targetString = "Total likes & RTs:"

async function updateCounterInTxt(path, logArray) {
  const lineWriter = fs.createWriteStream(path)
  lineWriter.on("error", (err) => {
    customDevConsoleLog(err, logEnabled)
  })

  // arrayToWrite.forEach((item, index) => {
  //   // TODO: Edit line which contains counter
  //   if (index === 0 && item.includes(targetString)){
  //     customDevConsoleLog("String for counter found", logEnabled)
  //     let lineToUpdate = line
  //   }
  //   lineWriter.write(item + "\n")
  // })
  // lineWriter.end()

  // Update counter in log file
  if (logArray[0].includes(targetString)) {
    let line = logArray[0] // Line to be updated
    let spaceIndex = line.lastIndexOf(" ") // Get the index of whitespace between text and counter number
    let counterText = line.substr(0, spaceIndex + 1) // +1 to include the whitespace after the text
    let counterNumber = line.substring(spaceIndex + 1) // +1 to not take the whitespace with the number
    counterText += Number(counterNumber) + 1 // Add the updated counter to the text
    logArray[0] = counterText // Replace old counter line with updated one
  }
  await writeToFile(path, logArray)
}

module.exports = updateCounterInTxt
