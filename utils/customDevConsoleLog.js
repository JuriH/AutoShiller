require("dotenv").config({path: "../.env"})

function customDevConsoleLog(toLog, enabled){
  if (process.env.DEV_LOG === "1" && enabled === 1) console.log(toLog)
}

module.exports = customDevConsoleLog