const customWaitSelector = require("./customWaitSelector")

// /**
//  * querySelectorPromiseRace(page, timeout_for_whole_promise_race, selectors...)
//  **/
async function querySelectorPromiseAny() {
  const page = arguments[0]
  const timeoutMs = arguments[1]
  let selectors = []

  // Get every selector array into one array for easy iteration
  for (let i = 2; i < arguments.length; i++) {
    selectors.push(arguments[i])
  }

  let promisesArray = [
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("timedOut")
      }, timeoutMs)
    }),
  ]

  selectors.forEach((promiseSelector) => {
    console.log("Selector: " + promiseSelector[0] + ", " + promiseSelector[1])
    promisesArray.push(
      new Promise((resolve, reject) => {
        resolve(
          customWaitSelector(page, null, promiseSelector[0], promiseSelector[1])
        )
      })(
        // When consumer calls `cancel`:
        (cancel = () => {
          // In case the promise has already resolved/rejected, don't run cancel behavior!
          if (finished) {
            return
          }

          // Cancel-path scenario
          console.log("Cancelling Promise")
          clearInterval(id)
          reject()
        })
      )
    )
  })

  let promiseRaceResult

  // Code for "hack" to implement Promise.any() before its official implementation: https://stackoverflow.com/a/39941616

  const invert = (p) => new Promise((res, rej) => p.then(rej, res))
  const firstOf = (ps) => invert(Promise.all(ps.map(invert)))

  firstOf(promisesArray)
    .then((x) => {
      console.log("Promise.firstOf: " + x)
      promiseRaceResult = x
    })
    .catch((err) => {
      console.log(err)
    })

  return promiseRaceResult
}

module.exports = querySelectorPromiseAny
