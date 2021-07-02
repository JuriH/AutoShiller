require("dotenv").config({path: "../.env"})

function customDevConsoleLog(toLog, enabled){
  if (process.env.DEV_LOG === "1" && enabled) console.log(toLog)
}

module.exports = customDevConsoleLog