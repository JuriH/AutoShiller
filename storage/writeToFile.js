const fs = require("fs")
const customDevConsoleLog = require("../utils/customDevConsoleLog")

const logEnabled = true

async function writeToFile(path, arrayToWrite) {
  // Write to file
  let lineWriter = fs.createWriteStream(path)
  lineWriter.on("error", function (err) {
    if (err) {
      customDevConsoleLog(err, logEnabled)
      return
    }
  })
  arrayToWrite.forEach((line, index) => {
    console.log("Line: " + line)
    lineWriter.write(line + "\n")
  })
  lineWriter.end()
}

module.exports = writeToFile
