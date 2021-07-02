async function customScrollIntoView(page, selector, index) {
  console.log("Scrolling into tweet")

  // await page.evaluate(
  //   (selector, index) => {
  //     document.querySelector(selector).childNodes[index].scrollIntoView()
  //   },
  //   selector,
  //   index
  // )

  // Check that scrolling was done successfully
  const scrolled = await page.evaluate(
    async (selector, index) => {
      // Function defined inside the evaluation: https://stackoverflow.com/a/58040978
      // getBoundingClientRect() in Puppeteer: https://github.com/puppeteer/puppeteer/issues/310#issue-250779527

      async function customGetBoundingClientRect(element) {
        const {x, y, width, height} = element.getBoundingClientRect()
        return {left: x, top: y, width, height}
      }

      const tweetBefore = document.querySelector(selector).childNodes[index]

      // const rectBefore = tweetBefore.getBoundingClientRect()
      const rectBefore = await customGetBoundingClientRect(tweetBefore)
      // console.log("top before scroll: " + rectBefore.top)

      // True aligns to top of parent, false to bottom: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
      tweetBefore.scrollIntoView(true)

      const tweetAfter = document.querySelector(selector).childNodes[index]

      const rectAfter = await customGetBoundingClientRect(tweetAfter)
      // console.log("top after scroll: " + rectAfter.top)

      if (rectAfter.top < rectBefore.top && rectAfter.top === 0) return true
      return false
    },
    selector,
    index
  )

  if (scrolled) {
    console.log("Scrolled into element successfully")
  } else {
    console.log("Failed to scroll into element")
  }

  return scrolled
}

module.exports = customScrollIntoView
