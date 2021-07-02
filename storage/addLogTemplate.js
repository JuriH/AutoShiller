const writeToFile = require("../storage/writeToFile")
const readFromFile = require("../storage/readFromFile")

async function addTemplate(path, templateArray) {

  await writeToFile(path, templateArray)

  // Check that writing executed successfully
  let checkArray = await readFromFile(path)

  return (await ifArraysEqual(templateArray, checkArray))
}

module.exports = addTemplate
