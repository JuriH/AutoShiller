// https://github.com/puppeteer/puppeteer/issues/310#issue-250779527

async function customGetBoundingClientRect(element) {
  const {x, y, width, height} = element.getBoundingClientRect()
  return {left: x, top: y, width, height}
}

module.exports = customGetBoundingClientRect