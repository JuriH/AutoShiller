const customDevConsoleLog = require("../utils/customDevConsoleLog")
const fs = require("fs")

const logEnabled = true

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
          customDevConsoleLog("Log file created", logEnabled)
        }
      })
    } else {
      customDevConsoleLog("Log file exists", logEnabled)
    }
  })
}

module.exports = createLogFile
