/* Set up an HTTP request (Hypertext Transfer Protocol 
Request: what do we want to do (generate a new word or phrase)
Response: what was actually done

What we're going to do for our program is to put in an HTML request to Mead's puzzle endpoint. It will then generate a random word or phrase as a JSON object. We can parse that JSON into a Javascript object and use it for our game!
*/

/* Declare the puzzle variable */
let word1

/* Initialize the puzzle to the browser using DOM manipulation */
// word1.generatePuzzleDOM()
// word1.generateAttemptsDOM()
// word1.generateStatusDOM()
// console.log(word1.getStatus())


/* Initialize the puzzle so the user can see how many letters it has */
// console.log(word1.getPuzzle())
// For this game, guess c, t, z
// word1.guessLetter('c')
// word1.guessLetter('t')
// word1.guessLetter('z')
// console.log(word1.getPuzzle()) // c*t
// console.log(`You have ${word1.attemptsRemaining} attempt(s) remaining`)// Print remaining guesses (should be 1)

// const word2 = new Hangman('New Jersey', 4)
// // Guess w
// word2.guessLetter('w')

// console.log(word2.getPuzzle()) // **w ******

// console.log(word1)
// console.log(word2)

/* Let's add an event listener to the window to allow users to make guesses from the browser. We will use
the 'keypress' event listener and access the property of the event called charcode (character code). */
window.addEventListener('keypress', (e) => {
    const guess = e.key
    // console.log(word1.guessLetter(guessLetter))
    // console.log(word1.getPuzzle())
    // console.log(`You have ${word1.attemptsRemaining} attempt(s) remaining`)// Print remaining guesses (should be 1)
    word1.guessLetter(guess)
    // word1.generatePuzzleDOM()
    // // word1.generateAttemptsDOM()
    // word1.generateStatusDOM()
    renderGame()
    console.log(word1.statusMessage)
    // console.log(`You have ${word1.attemptsRemaining} attempt(s) remaining`)// Print remaining guesses (should be 1
})

/* Let's create a function that renders the game information to the browser */
const renderGame = () => {
    word1.generatePuzzleDOM()
    word1.generateStatusDOM()
    word1.generateGuessedLettersDOM()
}

/* Let's set up a function that allows you to start a game */

const startHangmanGame = async () => {
    const puzzle = await getPuzzle('2')
    word1 = new Hangman(puzzle, 5)
    renderGame()
}

/* Initialize the game bu calling startHangmanGame */
startHangmanGame()

/* Set up an event listener to reset the game when the reset button is clicked */
document.querySelector('#reset').addEventListener('click', (e) => {
    startHangmanGame()
})
/* Let's call a function that gets our puzzle for the hangman game */
/* At first glance, we could simply call a function that goes off and snags the puzzle for us, then returns the data for the puzzle. However, this will not work because the process of getting the puzzle is not instant. We have to wait for the HTTP request to be fulfilled. Therefore, the Javascript code that uses the data will run before the data has been retrieved by the HTTP request, and will never work */
/* Instead, we can pass a callback function to getPuzzle() as an argument. This callback function is in turn called with the puzzle that was fetched. In this example, the callback function simply prints the puzzle. nowe we have to actually set up getPuzzle(), which we do in requests.js */
// getPuzzle(5, function(error, puzzle) {
//     if (error) {
//         console.log(`Error: ${error}`)
//     } else {
//         console.log(puzzle)
//     }
// })

/* Here is the Promise function version of the getPuzzle call. Now that getPuzzle is a Promise function, we do not need the callback function call. We just need to pass in whatever variable the promise function will be using, in this case the word count. getPuzzle will execute a promise function that, if successful (resolved), will return the puzzle data. We can then print the puzzle. If the promise function is not successful (rejected), we can print the error message. */

// getPuzzle('5').then( (puzzle) => {
//     console.log(puzzle)
// }, (error) => {
//     console.log(`Error: ${error}`)
// })

/* The code below illustrates synchronous execution. The disadvantage to synchronous Javascript is that we are forced to wait for puzzle getter function to executre entirely before the remainder of the code is run. In asynchronous Javascript, we are allowed to run other code while the request takes 100 ms to be made. */

// const puzzle = getPuzzleSync()
// console.log(puzzle)
// console.log('Do something else')

// const product = {
//         name: 'Influence'
// }


/* The hasOwnProperty method tests whether an object has a particular property and returns true or false. The 
reason it's not called hasProperty is because some properties can be prototype properties, such as the hasOwnProperty
method. It is not very useful to check for prototype properties because they can be shared by multiple objects */
/* So what's happening when we try to access an object's property? We start by looking at the object (instance) itself.
If it is there, great. If not, then we climb the chain to Object.prototype. Object.prototype also has a prototype
value, null. This is where the chain ends
product --> Object.prototype --> null
So, hasOwnProperty let's us check whether the property exists on the object itself, not further up the prototype 
chain
*/
/* Let's consider a REALLY BAD example of overwriting a built-in prototype function, in this case hasOwnProperty.
We should NEVER do this */
// Object.prototype.hasOwnProperty = () => 'This is the new hasOwnProperty function'

// console.log(product.hasOwnProperty('hasOwnProperty'))
// console.log(product)


/* An important note is that when we made the product object, the new operator was not used for the Object constructor
function. This is because we have defined the product object using literal syntax - when the syntax of the language 
allows us define a value of a certain type using a sequence of characters. 
// Literal syntax:
// const product = {
//         name: 'Influence'
// }
The language sees this syntax and interprets it, knowing that we are trying to create a new object. Thus, the
new operation is done behind the scenes */

/* Consider this example where we don't use literal syntax. Instead, we explicity use the new operator on the 
Object() constructor function, which has the effect of creating an empty object. We can then set properties 
for this object using dot notation, as we have done before. We will almost never call the Object constructor */
// const product = new Object()
// product.name = 'Rest'

// console.log(product)

/* To summarize, the object constructor can either be used literally 
object = {}
or called as a constructor
new Object([value])

 MDN page for more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
 */


 /* Let's now explore primitives and objects for other types that can utilize prototypal inheritance, such as
 arrays and functions.

 Primitive value: a value that does not have properties. It is a non-object.

 Includes string, number, boolean, null, and undefined
Consider the prototype chain for an object:
 Object: myObject --> Object.prototype --> null
Now consider the chain for an array. Unlike an object, an array actually has a prototype value, which is actually
the object prototype. This is why it makes sense to state that an array is actually just a customized object.
Array: myArray --> Array.prototype --> Object.protoype --> null
 */

//  const team = ['Luke', 'Madison']
//  console.log(team)
//  console.log(team.hasOwnProperty('length'))

 /* Let's now explore functions! 
Function: myFunc --> Function.prototype --> Object.prototype --> null
 */

//  const getScore = () => 1
//  console.log(getScore)

 /* But what about strings, numbers, and booleans? We've definitely accessed properties on all of these types!
 So how is it not an object yet has properties? 
 What happens is that behind the scenes when we access a property on a string, JS converts the string into an
 object using an object wrapper, giving us access to all of the methods we know. */
 /* The string prototype chain is as follows:
 String: myString --> String.prototype --> Object.prototype --> null
  */

//  const product = 'Computer'
//  console.log(product)
 
 /* When a string is created using the constructor function, it is actually created as a string object instead 
 of a primitive string */

//  const otherProduct = new String('Phone')
//  console.log(otherProduct)

 /* Prototype chain for numbers
 Number: myNumber --> Number.prototype --> Object.prototype --> null */
 /* Prototype chain for booleans 
 Boolean: myBoolean --> Boolean.prototype --> Object.prototype --> null
 */

// /* Let's make our HTTP request here. We first initialize the request using a constructor function provided to us by the browser called XMLHttPRequest */
// const request = new XMLHttpRequest()

// /* Let's add an event listener to do something once the request returns information. readyState is a property of XMLHttpRequest, and when it changes, our event listener will fire. There are 5 different states:
// 0, 1, 2, 3, and 4. State 4 is when the operation is complete, and that is the only one we will use. */
// request.addEventListener('readystatechange', (e) => {
//     /* We will only act when the status of the request is at 4. If it is, we will collect the JSON data that is stored in e.target.responseText (which in this case is the JSON with the puzzle data). We will then parse it into a Javascript object using the JSON.parse method. */
//     /* We also want to check the value of the status code in addition to the readyState. This value essentially tells you how your request went, and it can be various levels of success or failure. This value lives in e.target.status */
//     if (e.target.readyState === 4 && e.target.status === 200) {
//       // console.log(e.target.status)
//       // console.log(e.target)
//       const data = JSON.parse(e.target.responseText)
//       console.log(data)
//       /* In cases where the status is not 200 but the state is 4, we will print an message stating that an error has occured */
//       } else if (e.target.readyState === 4) {
//       console.log('An error has taken place!')
//     }
// })
// /* The open method intializes the request to configure two important pieces of information: the URL, and the HTTP method GET */
// request.open('GET','http://puzzle.mead.io/puzzle?wordCount=3')
// /* Now we send off the request */
// request.send()

// /* httpstatuses.com is a list of all potential status codes 
// http message*/

// /* Video 106 Challenge
// 1. Make a new request for all countries using the GET method and the proper URL
// 2. Parse the responseText, which will be an array of objects where each object will represent a specific country
// 3. Find your country by country code (alpha2Code property === country code)
// 4/ Print the full country name
// */

/* Video 109 Challenge 
1. Create a new function for getting the country details
2. Call it with two arguments: the country code, and the callback function
3. Make the HTTP request and call the callback function with the country information
4. Use the callback to print the country name */

// getCountryName("GB", function(error, countryName) {
//     if (error) {
//         console.log(`Error: ${error}`)
//     } else {
//         console.log(`Full country name: ${countryName}`)
//     }
// })

/* Promise version of getCountryName function call for video 112 Challange */

// getCountryName("TT").then( (countryName) => {
//     console.log(`Full country name: ${countryName}`)
// }, (error) => {
//     console.log(`Error: ${error}`)
// })

// /* This code will made a request to the country data URL. If successful, the request will return a JSON object. Once parsed, the JSON will give an array of country data, where each country is represented by an object of multiple properties. Using the findIndex array method, we will search this array for a country whose alpha2Code matches the one that we're looking for ("US") in this case. With the index returned, we can use it to then access the country at that index, and access the "name" property which contains the full text name. Simply print it! */
// const countryRequest = new XMLHttpRequest()
// countryRequest.open('GET','http://restcountries.eu/rest/v2/all')
// countryRequest.send()
// countryRequest.addEventListener('readystatechange', (e) => {
//     if (e.target.readyState === 4 && e.target.status === 200) {
//         // console.log(e.target.status)
//         // console.log(e.target)
//         const countryData = JSON.parse(e.target.responseText)
//         console.log(countryData)
//         const indexCountry = countryData.findIndex(function (country) {
//           return country.alpha2Code === 'US'
//         })
//         console.log(indexCountry)
//         console.log(countryData[indexCountry].name)
//         /* In cases where the status is not 200 but the state is 4, we will print an message stating that an error has occured */
//         } else if (e.target.readyState === 4) {
//         console.log('An error has taken place!')
//     }
// })

/* Video 114: The Fetch API 
The fetch function returns a Promise, which we can wait to either resolve or reject and then handle with the .then operator. Let's do an example with the puzzle fetcher. This method will return the HTTP response, which we again want to check to be sure it was a success (=== 200). If it is, we'll run code to deal with it. If it is not, then we want to throw an error so that the catch function runs 
The response to the fetch.then method has its own method called json(), which will parse the response data as json. The json() method does not return a Javascript object, but rather a Promise which will need to be resolved. Similar to promise chaining in promises.js, we will return the resolved response.json() and then call the then() function on it, passing in the resolved data as an argument. We can then decide what to do with this data. In this example we just print to the console */
// fetch('http://puzzle.mead.io/puzzle', {}).then( (response) => {
//     if (response.status === 200) {
//         return response.json()
//     } else {
//         throw new Error('Unable to fetch the puzzle')
//     }
// }).then( (data) => {
//     console.log(data.puzzle)
// }).catch( (error) => {
//     console.log(error)
// })

/* Video 114: Fetch API version of getPuzzle */
/* Once the getPuzzle() call returns our resolved data from the response.json() method, we can access that puzzle information from that data */
// getPuzzle('3').then( (puzzle) => {
//     console.log(puzzle)
// }).catch((error) => {
//     console.log(`Error: ${error}`)
// })

/* Video 155: Fetch version of getCountry */
/* Once the getPuzzle() call returns the name of the country, we simply print it! */

// getCountryName("TT").then( (countryName) => {
//     console.log(`Full country name: ${countryName}`)
// }).catch( (error) => {
//     console.log(error)
// })

/* Video 116 Challenge
1. Create getLocation function which takes no argument in requests.js
2. Set up getLocation to make a request to the URL and parse the data
3. Call getLocation in app.js to print the city, region, and country information */

// getLocation().then( (data) => {
//     console.log(data)
//     console.log(`You are currently located in ${data.city}, ${data.region}, ${data.country}`)
// }).catch( (error) => {
//     console.log(error)
// })

/* In the example below, we first use the getLocation() function to return the location data based on IP. Once that data resolves, we pass the country property of that data(containing the country code) into getCountryName. getCountryName() will return the full country name. We then return that value to the .then() call. Finally, we chain on another .then() call, passing in the countryName data and printing it to the console */

// getLocation().then( (data) => {
//     return getCountryName(data.country)
//     }).then( (countryName) => {
//         console.log(`Full country name: ${countryName}`)
// }).catch( (error) => {
//     console.log(error)
// })

/* Video 118 Challenge B call */
// getCurrentCountry().then( (countryName) => {
//     console.log(`Your current country is ${countryName}`)
// }).catch( (error) => {
//     console.log(error)
// })