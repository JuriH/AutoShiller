const fs = require("fs")
const readline = require("readline")
require("dotenv").config({path: "../.env"})

const filePath = process.env.TXT_FILEPATH

let lineReader
let content = []

async function createSimpleDataStorage(path) {
  // Sub functions

  async function writeSampleDataTxt() {
    const lineWriter = fs.createWriteStream(filePath)
    lineWriter.on("error", function (err) {
      console.log(err)
    })
    logTemplate.forEach((item, index) => {
      lineWriter.write(item + "\n")
    })
    lineWriter.end()
  }

  async function checkIfTxtExists(path) {
    try {
      // fs.readFile("../tweetLog.txt", "utf8")
      fs.readFile(path, "utf8")
    } catch (err) {
      console.log("The file does not exist, creating a new one")

      // Create options for writing a file
      // https://nodejs.org/api/fs.html#fs_file_system_flags
      // w = Open file for writing, the file is created if doesn't exist.
      // x = Doesn't overwrite file it it already exists
      options = {}
      options.flag = "wx"

      // fs.writeFile(filePath, "", options, function (err) {
      //   if (err) return
      // })

      await writeSampleDataTxt()
    }
  }

  function updateCounterInTxt(arrayToWrite) {
    const lineWriter = fs.createWriteStream(filePath)
    lineWriter.on("error", (err) => {
      console.log(err)
    })
    arrayToWrite.forEach((item, index) => {
      lineWriter.write(item + "\n")
    })
    lineWriter.end()
  }

  // Execution order starts here

  await checkIfTxtExists(path)

  lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("./test.txt"),
  })

  // Read text file line by line
  lineReader.on("line", (line) => {
    console.log(line)
    content.push(line) // Store all read lines to an array for later use
  })

  // After text file has been read
  lineReader.on("close", function () {
    console.log(content)

    // Update the counter in the text file
    lineToUpdate = {
      oldText: "",
      newText: "",
      index: -1,
    }

    lineToUpdate.oldText = content.find((a) => a.includes("Total likes & RTs:"))
    lineToUpdate.index = content.indexOf(lineToUpdate.oldText)

    console.log("Index: " + lineToUpdate.index)

    // Edit the counter number in the text
    const oldCount = lineToUpdate.oldText
      .substring(
        lineToUpdate.oldText.length,
        lineToUpdate.oldText.lastIndexOf(" ")
      )
      .replace(" ", "")
    const newCount = Number(oldCount) + 1

    console.log(
      "Total likes & RTs increased from " + oldCount + " to " + newCount
    )

    lineToUpdate.newText = lineToUpdate.oldText.replace(oldCount, newCount)
    content[lineToUpdate.index] = lineToUpdate.newText

    console.log("lineToUpdate: " + content)

    updateCounterInTxt(content)
  })
}

module.exports = createSimpleDataStorage()
