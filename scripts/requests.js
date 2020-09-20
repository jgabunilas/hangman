

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



