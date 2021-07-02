async function customKeyPresser(page, key, consoleLog){
  await page.keyboard.press(key)
  if (consoleLog !== "") console.log(consoleLog)
}

module.exports = customKeyPresser