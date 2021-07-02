async function getTweetText(page, selector, index) {
  // Get validated tweet's text
  let tweetText = await page.evaluate(
    (selector, index) => {
      const tweet = document.querySelector(selector).childNodes[index]
      const elems = tweet.querySelectorAll('div > div:nth-child(1) div[lang]')[0].children

      let tweetText = "" // Without the double quotes there was a weird 'undefined' at the start of the string

      // Add all tweet's text into single string
      elems.forEach((elem) => {
        if (elem.parentElement.tagName !== "A") // Ignore spans that are child elements of A-tag (usually contain only "http://" while the parent A-element contains whole link(s))
        // console.log(elem.textContent)
        tweetText += elem.textContent
      })

      return tweetText
    },
    // Variables below are passed to the page.evaluate()
    selector,
    index
  )

  console.log("TweetText: \"" + tweetText + "\"")

  // Remove all newlines
  tweetText = tweetText.replace(/(\r\n|\n|\r)/gm, "")

  // Remove unnecessary double spacings before returning all the text
  return tweetText.replace(/^\s+/g, " ")
}

module.exports = getTweetText
