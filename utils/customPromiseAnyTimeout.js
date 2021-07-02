const Promise = require("bluebird");

let timeout

async function promiseTimeout(timeout){
  return new Promise((resolve, reject, cancel) =>{
    setTimeout(() => {
      return "PromiseAnyTimedOut"
    }, timeout)
  }).cancellable()
}

async function customPromiseAnyTimeout() {

  // Get timeout in ms for Promise.any
  let timeoutMs = arguments[0]

  // Assign dynamic amount of arguments (Promises) to an array
  let promisesArray = []
  promisesArray.push(promiseRaceTimeout())

  for(let i = 1; i < arguments.length; i++){
    promisesArray.push(arguments[i])
  }
}

module.exports = customPromiseAnyTimeout