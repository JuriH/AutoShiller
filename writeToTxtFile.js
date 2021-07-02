const fs = require("fs")
const doAsync = require("doasync")

const path = "./ShillStats.txt"
let content

async function writeToTxtFile() {
  async function txtFileContentToVar() {
    doAsync(fs)
      .readFile(path)
      .then((data) => (content = data))
  }

  async function checkFileExists() {
    try {
      if (fs.existsSync(path)) {
        //file exists
        txtFileContentToVar()
      }
    } catch (err) {
      console.error(err)
    }
  }
}
