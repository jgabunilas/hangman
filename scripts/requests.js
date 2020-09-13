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



/* The function below illustrates synchronous Javascript. In this version of the script, we send off the request and turn asynchronous off (false). This allows us to get our data from request directly, then use it to grab our puzzle data. In this case we CAN return the data to the function directly since we are no longer using the event listener callback function. */
// const getPuzzleSync = () => {
//         const request = new XMLHttpRequest()
//         request.open('GET','http://puzzle.mead.io/slow-puzzle?wordCount=3', false)
//         /* Now we send off the request */
//         request.send()
//         if (request.readyState === 4 && request.status === 200) {

//                 const data = JSON.parse(request.responseText)
//                 return data.puzzle

//         } else if (request.readyState === 4) {
//                 throw new Error('Things did not go well')
//         }
// }

/* The function below is part of Video 109 Challenge. 
getCountryName gets called with a country code and a callback function. When called, it creates and sends an HTTP request to the restcountries database, where it retrieves an object containing country data. When the event listener detects that the HTTP request was successful, it retrieves the country data from the event argument "e" and parses it using JSON into a JavaScript object, which in this case is an array of objects containing country data. Next, the findIndex array method is used to iterate through the array and find the index whose country code matches the countryCode passed in to the getCountryName function. When that index is found, the callbackFunction is invoked, and the country code index is used to find the full name of the country corresponding to that index. That full name is passed as the second argument of the callback function, which then prints the full name of the country.
 */

// const getCountryName = (countryCode, callbackFunction) => {
//         const countryRequest = new XMLHttpRequest()
//         countryRequest.open('GET','http://restcountries.eu/rest/v2/all')
//         countryRequest.send()
//         countryRequest.addEventListener('readystatechange', (e) => {
//                 if (e.target.readyState === 4 && e.target.status === 200) {
//                         const countryData = JSON.parse(e.target.responseText)
//                         const indexCountry = countryData.findIndex(function (country){
//                                 return country.alpha2Code === countryCode
//                         })
//                         callbackFunction(undefined, countryData[indexCountry].name)
//                 } else if (e.target.readyState === 4) {
//                         callbackFunction('An error has taken place!')
//                 }
//         })
// }

/* Promise function version */

// const getCountryName = (countryCode) => new Promise ((resolve, reject) => {
//         const countryRequest = new XMLHttpRequest()
//         countryRequest.open('GET','http://restcountries.eu/rest/v2/all')
//         countryRequest.send()
//         countryRequest.addEventListener('readystatechange', (e) => {
//                 if (e.target.readyState === 4 && e.target.status === 200) {
//                         const countryData = JSON.parse(e.target.responseText)
//                         const indexCountry = countryData.findIndex(function (country){
//                                 return country.alpha2Code === countryCode
//                         })
//                         resolve(countryData[indexCountry].name)
//                 } else if (e.target.readyState === 4) {
//                         reject('An error has taken place!')
//                 }
//         })
// })

/* Using the fetch API for the getCountryName
1. Convert getCountry to use fetch and return a promise
2. Make sure that getCountry still resolves with the country that matches the country code
3. Change getCountry usage to use catch as the new error handler 
In this version, we begin by calling getCountryName() in app.js and pass in the countryCode as an argument. getCountryName() launches a fetch() function to make a request for the data. Once that request completes, we take the response and pass it into the .then() function. This .then() function checks whether the response was successful. It it was, we return the response.json() promise function, which will resolve into the object data we want. If it was no successful, we thrown an error. Once the response.jason resolves, we pass that data into another .then() function, where we search for the index in the country array whose code matches the country code passed into getCountryName(). We then use that index to find the full name of that country by searching the .name property of the country data array at that index. The country name is returned to the getCountryName() call. */

// const getCountryName = (countryCode) => {
//         return fetch('http://restcountries.eu/rest/v2/all', {}).then( (response) => {
//                 if (response.status === 200) {
//                         // console.log(`success`)
//                         return response.json()              
//                 } else {
//                         throw new Error('Unable to fetch country data')  
//                 }
//         }).then( (countryData) => {
//                 // console.log(countryData)
//                 const indexCountry = countryData.findIndex(function (country){
//                         return country.alpha2Code === countryCode
//                 })
//                 return countryData[indexCountry].name
//         })
// }

/* Video 118 Challenge A: 
Below is an await version of getCountryName() */

const getCountryName = async (countryCode) => {
        const response = await fetch('http://restcountries.eu/rest/v2/all', {})
                if (response.status === 200) {
                        const countryData = await response.json()
                        const indexCountry = countryData.findIndex(function (country){
                                return country.alpha2Code === countryCode
                        })
                        return countryData[indexCountry].name              
                } else {
                        throw new Error('Unable to fetch country data')  
                }
        }

/* The function below first makes an HTTP request using the fetch() function. Once the response is finished, we then check the status. If the status is successful, we return the response.json() data, which will resolve into the location object */
// const getLocation = () => {
//         return fetch('http://ipinfo.io/json?token=579a09cb9a6bbf', {}).then( (response) => {
//                 if (response.status === 200) {
//                         return response.json()
//                 } else {
//                         throw new Error('Unable to fetch location data')
//                 }
//         })
// }

/* Video 118 Challenge A: 
Below is an await version of getLocation() */

const getLocation = async () => {
        const response = await fetch('http://ipinfo.io/json?token=579a09cb9a6bbf', {})
        if (response.status === 200) {
                return response.json()
        } else {
                throw new Error('Unable to fetch location data')
        }
}

/* Video 118 Challenge B:
Create a new function called getCurrentCountry
This function should return a promise that resolves the country object for your current location. It will first get your location, then it will get your country, then it will return the country it finds.
Use async/await for this new function */

// const getCurrentCountry = async () => {
//         const locationData = await getLocation()
//         const countryName = await getCountryName(locationData.country)
//         return countryName
// }