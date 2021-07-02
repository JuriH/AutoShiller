const fs = require("fs")

async function readFromFile(path) {
  const checkArray = fs.readFileSync(path, "utf8").split("\n")

  return checkArray
}

module.exports = readFromFile
