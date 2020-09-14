/* Let's explore callback patters to understand them better */

/* Now that we have passed a callback function into getPuzzle, we have to actually define getPuzzle. We define it as a function that takes an argument, in this case a callback function. We have defined the callback function in app.js. We then call the callback function with the argument that it expects, which by definition is the puzzle that we've retrieved. When the callback function is called by getPuzzle, it is executed and prints the puzzle to the console */
// const getPuzzle = (callbackFunction) => {
//         callbackFunction('Some fake puzzle')
// }

/* For our actual solution we apply the same strategy. When we call getPuzzle, we pass the callbackFunction in as an argument. We run our HTTP request, collect the data, and parse it into Javascript object data. But instead of simply returning this data, we instead pass it into the callbackFunction when then executes. This ensures that the data is not printed until the callback function has a chance to run! */
/* In other words, getPuzzle() does not actually return anything. Instead, it carries out its instructions (gets data via HTTP request) and passes that data to a callback function, which then uses the data the way we want. This ensures that the data does not get used (printed, etc.) until the callback function is executed, which is not until after the data is actually retrieved. */
/* Why can't we return data within the addEventListener callback function? If we tried that, data would get returned NOT to the getPuzzle function, but to the addEventListener callback function, which we do not want. */
/* Why can't we define a variable within getPuzzle called 'data', manipulate it with the addeventListener callback function (assign the data from the HTTP request to it), and then return 'data' after it has been updated at the end of getPuzzle()? The reason that does not work is because the HTTP request is much slower than the command to return 'data'. In other words, data will be returned long before the HTTP request has the ability to manipulate it. */
// const getPuzzle = (wordCount, callbackFunction) => {
//         const request = new XMLHttpRequest()
//         request.addEventListener('readystatechange', (e) => {
//                 if (e.target.readyState === 4 && e.target.status === 200) {

//                         const data = JSON.parse(e.target.responseText)
//                         // console.log(data)
//                         callbackFunction(undefined, data.puzzle)

//                 } else if (e.target.readyState === 4) {
//                         /* Since our callback function contains an error argument, we can also use it when we actually have an error */
//                         callbackFunction('An error has taken place', undefined)
//                         // console.log('An error has taken place!')
//                 }
//         })
//         request.open('GET',`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
//         /* Now we send off the request */
//         request.send()
// }

/* Let's make a Promise version of getPuzzle! This version takes only the wordCount argument; the callbackFunction is no longer needed. In this version, getPuzzle() returns a Promise function that handles our HTTP request. Once that request is done, we call the resolve function and pass in the data we have obtained. Similarly, if the request fails, we call the reject function with our error message. */

// const getPuzzle = (wordCount) => new Promise( (resolve, reject) => {
//         const request = new XMLHttpRequest()
//         request.addEventListener('readystatechange', (e) => {
//                 if (e.target.readyState === 4 && e.target.status === 200) {

//                         const data = JSON.parse(e.target.responseText)
//                         // console.log(data)
//                         resolve(data.puzzle)

//                 } else if (e.target.readyState === 4) {
//                         /* Since our callback function contains an error argument, we can also use it when we actually have an error */
//                         reject('An error has taken place')
//                         // console.log('An error has taken place!')
//                 }
//         })
//         request.open('GET',`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
//         /* Now we send off the request */
//         request.send()
// })

/* Using the fetch API for the getPuzzle function
Here, getPuzzle is called with the wordCount passed in as an argument. We then run a fetch function, which will return a Promise that is resolved containing the response. Once that Promise is resolved into a response, we take the response and check if the response was successful (=== 200). If it is, we parse the response using the json() method and return it. Remember that the .json() is a promise that will resolve into our puzzle data. We can then return this data to the getPuzzle() call. However, since this data is an object with many properties and we really just want the puzzle text, we can add a .then() call to the end of the fetch() function. We can access the resolved data using this .then() call and pull the puzzle string out of it, returning that to the getPuzzle() call.  */
const getPuzzleOld = (wordCount) => {
        return fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`, {}).then( (response) => {
                if (response.status === 200) {
                        return response.json()
                } else {
                        throw new Error('Unable to fetch puzzle')
                }
        }).then( (data) => {
                return data.puzzle 
        })
}

/* Let's create an async version of the getPuzzle function. In this case, we still use fetch to grab out puzzle data. fetch() is still a promise function that will resolve into a response. The only difference here is that instead of attaching .then()and adding a handler, simply use await in front of fetch and store the resolved value as a variable, in this case "response". We can then check the status of that response, and if it is successful, we can utilize the .json() promise method on response and await its resolution, setting the resolved value equal to our data. Finally, we can return our data as the response to the getPuzzle function call!   */
const getPuzzle = async (wordCount) => {
        const response = await (fetch(`//puzzle.mead.io/puzzle`, {}))
        if (response.status === 200) {
                const data = await response.json()
                return data.puzzle
        } else {
                throw new Error('Unable to fetch puzzle')
        }
}



