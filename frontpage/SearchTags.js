const customInput = require("./customInput")
const customWaitSelector = require("./customWaitSelector")
const customKeyPresser = require("./customKeyPresser")
const customWaitFeed = require("./customWaitFeed")
require("dotenv").config({path: ".env"})

async function searchTags(page, tags) {
  await customWaitSelector(
    page,
    'input[placeholder="Search Twitter"]',
    "Search-field found"
  )

  await customInput(
    page,
    'input[placeholder="Search Twitter"]',
    tags,
    "Search tags entered"
  )

  await customKeyPresser(page, "Enter", "Started search")
  await customWaitFeed(page)
}

module.exports = searchTags
