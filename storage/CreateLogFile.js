const addLogTemplate = require("./addLogTemplate")
const customDevConsoleLog = require("../utils/customDevConsoleLog")

const logEnabled = true

const logTemplate = [
  "Total likes & RTs: 0",
  "",
  "Tweet history:",
  // Example line: "11:39:00 16/06/2021 https://twitter.com/the_happy_coin/status/1404745909083246593",
]

async function createLogFile(path) {
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      customDevConsoleLog("Log file doesn't exist, creating a new one", logEnabled)

      // Options for creating a file
      options = {}
      options.flag = "wx"

      fs.writeFile(path, "", options, function (err) {
        if (err) {
          customDevConsoleLog(err, logEnabled)
          return
        } else {
          if (await addLogTemplate(path, logTemplate)){
            customDevConsoleLog("Log file created successfully")
          } else {
            customDevConsoleLog("Failed to write template to log file")
          }
        }
      })
    } else {
      customDevConsoleLog("Log file exists", logEnabled)
    }
  })
}

module.exports = createLogFile
