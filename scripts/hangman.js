/* This file contains the functions for the hangman program */
// const Hangman = function (word, attempts) {
//     /* Use the string split method to make an array of letters */
//     this.word = word.toLowerCase().split('')
//     this.guessedLetters = []
//     this.attemptsRemaining = attempts
//     this.status = 'playing'
// }

/* Convert all the methods to class syntax */
class Hangman {
    constructor(word, attempts) {
    /* Use the string split method to make an array of letters */
        this.word = word.toLowerCase().split('')
        this.guessedLetters = []
        this.attemptsRemaining = attempts
        this.status = 'playing'
    }
    get Puzzle() {
        let puzzle = ''
        /* Iterate over every letter in the word array and check if it has been guessed */
        this.word.forEach( (letter) => {
            /* Initiate a placeholder for the current letter in the word array being evaluated */
            let currentLetter = ''
            /* Search the guessedLetters array for the current letter and save the index of that 
            position as indexCurrentLetterGuess */
            let indexCurrentLetterGuess = this.guessedLetters.indexOf(letter)
            /* If the guessedLetters array contains the current letter, indexCurrentLetterGuess will 
            have a value greater than -1. In that case, set the currentLetter placeholder equal
            to the letter being evaluated, as it has already been guessed */
            if (indexCurrentLetterGuess > -1) {
                currentLetter = letter
            /* Check the edge case of whether the current letter is a space. If it is, then set 
            currentLetter equal to space so that is gets included in puzzle */
            } else if (letter === ' ') {
                currentLetter = letter
            } else {
                /* If the currrent letter is not in the guessedLetters array, then set the currentLetter
                placeholder equal to an asterisk */
                currentLetter = '*'
            }
            /* Wth each iteration through the word array, add the currentLetter (which will either 
                be the letter value or an asterisk, depending on whether it was in the guessedLetters array) 
                to the puzzle. Then return the constructed puzzle */
            puzzle += currentLetter
            })
        return puzzle
    }
    guessLetter(letter) {
        if (this.status === 'playing') {
            letter = letter.toLowerCase()
            if (!this.guessedLetters.includes(letter)) {
                this.guessedLetters.push(letter)
                if (!this.word.includes(letter)) {
                    this.attemptsRemaining -- // This is shorthand notation for substracting 1
                }
            }
            this.statusMessage
        }
    }
    generatePuzzleDOM() {
        let puzzleElement = document.querySelector('#puzzle')
        /* Clear out the inner HTML */
        puzzleElement.innerHTML = ''
    /* Video 122 Challenge
    1. For each character in the string, add a span into #puzzle
    2. The span's text should just be the letter itself */
        /* Split the puzzle into an array */
        const puzzleArray = this.Puzzle.split('')
        /* For each letter in the puzzle array, add a span to the puzzle element for  that letter */
        puzzleArray.forEach( (letter) => {
            const letterElement = document.createElement("span")
            letterElement.textContent = letter
            puzzleElement.appendChild(letterElement)
        })
    }
    generateStatusDOM() {
        let message = ''
        if (this.status === 'playing') {
            message = `Guesses left: ${this.attemptsRemaining}`
        } else if (this.status === 'failed') {
            const fullWord = this.word.join('')
            message = `Game over! The word was "${fullWord}"`
        } else if (this.status === 'finished') {
            message = `Great work! You have guessed the word!`
        }
        document.querySelector('#status-msg').textContent = message
    }
    generateGuessedLettersDOM() {
        document.querySelector('#guessed-letters').innerHTML = ''
        if (this.guessedLetters.length > 0) {
            document.querySelector('#guessed-letters').textContent = `Letters guessed: ${this.guessedLetters}`
        }
    }
    get statusMessage() {
        if (!this.Puzzle.includes('*')) {
            this.status = 'finished'
        } else if (this.attemptsRemaining === 0) {
            this.status = 'failed'
        }
        return this.status
    }
    // getStatus() {
    //     if (!this.getPuzzle().includes('*')) {
    //         this.status = 'finished'
    //     } else if (this.attemptsRemaining === 0) {
    //         this.status = 'failed'
    //     }
    //     return this.status
    // }
} 

// Hangman.prototype.getPuzzle = function () {
// /* Initialize the puzzle that will be returned by the function. It will start as an 
// empty string and will be constructed as letters are guessed. */
// let puzzle = ''
// /* Iterate over every letter in the word array and check if it has been guessed */
// this.word.forEach( (letter) => {
//         /* Initiate a placeholder for the current letter in the word array being evaluated */
//         let currentLetter = ''
//         /* Search the guessedLetters array for the current letter and save the index of that 
//         position as indexCurrentLetterGuess */
//         let indexCurrentLetterGuess = this.guessedLetters.indexOf(letter)
//         /* If the guessedLetters array contains the current letter, indexCurrentLetterGuess will 
//         have a value greater than -1. In that case, set the currentLetter placeholder equal
//         to the letter being evaluated, as it has already been guessed */
//         if (indexCurrentLetterGuess > -1) {
//             currentLetter = letter
//         /* Check the edge case of whether the current letter is a space. If it is, then set 
//         currentLetter equal to space so that is gets included in puzzle */
//         } else if (letter === ' ') {
//             currentLetter = letter
//         } else {
//             /* If the currrent letter is not in the guessedLetters array, then set the currentLetter
//             placeholder equal to an asterisk */
//             currentLetter = '*'
//         }
//         /* After iterating over each letter in the word array, add the currentLetter (which will either 
//             be the letter value or an asterisk, depending on whether it was in the guessedLetters array) 
//             to the puzzle. Then return the constructed puzzle */
//         puzzle += currentLetter
//     })
//     return puzzle
// }

/* If the game is still in progress (status is "playing), this function will take a letter guess as input, converts it to lower case, and checks whether it has already been guessed by checking the guessedLetters array. If it has already been guessed we make no change. 
It has NOT been guessed, we add the letter to the guessedLetters array. This is important because the 
getPuzzle function will rely on this array when printing the word. We then check the array of word letters 
to see if the guessed letter is present. If the guessed letter is in the word, we make no change. If it is 
not in the word, we decrement the number of attempts by 1. Finally, the function calls the setStatus function,
which will update the status of the current game with every guess */
// Hangman.prototype.guessLetter = function (letter) {
//     if (this.status === 'playing') {
//         letter = letter.toLowerCase()
//         if (!this.guessedLetters.includes(letter)) {
//             this.guessedLetters.push(letter)
//             if (!this.word.includes(letter)) {
//                 this.attemptsRemaining -- // This is shorthand notation for substrating 1
//             }
//         }
//         this.getStatus()
//     }
// }

/* This function creates a DOM element for the puzzle and renders it to the screen */
// Hangman.prototype.generatePuzzleDOM = function () {
//     document.querySelector('#puzzle').textContent = this.getPuzzle()
// }

/* This function creates a DOM element for the attempts countdown and renders it to the screen */
// Hangman.prototype.generateAttemptsDOM = function () {
//     document.querySelector('#attempts-remaining').textContent = `You have ${this.attemptsRemaining} attempts remaining.`
// }

/* This function sets the status of the game. Start by checking whether the puzzle string contains any asterisks.
If it does not, then the game has been won and the status can be set to "finished". Otherwise, continue on and 
check the number of guesses remaining. If it is zero, change the status of the game to "failed". Remember that 
the remaining guesses only decreases if the guess is incorrect. Otherwise, leave the status as "playing" */
// Hangman.prototype.getStatus = function () {
//     if (!this.getPuzzle().includes('*')) {
//         this.status = 'finished'
//     } else if (this.attemptsRemaining === 0) {
//         this.status = 'failed'
//     }
//     return this.status
// }

/* This function will edit the status-msg DOM element that delivers a game status message depending on the current game status. */
// Hangman.prototype.generateStatusDOM = function () {
//     let message = ''
//     if (this.status === 'playing') {
//         message = `Guesses left: ${this.attemptsRemaining}`
//     } else if (this.status === 'failed') {
//         const fullWord = this.word.join('')
//         message = `Game over! The word was "${fullWord}"`
//     } else if (this.status === 'finished') {
//         message = `Great work! You have guessed the word!`
//     }
//     document.querySelector('#status-msg').textContent = message
// }


/* Video 96 Challenge 
Create a method for making a guess at hangman
1. The method should accept a character for guessing
2. The method should add unique guesses to the list of guesses
3. The method should decrement the attempts remaining if a unique guess is not a match
*/


/* Video 90 Challenge
1. create a constructor function for the hangman game
2. Set up two attributes. One for the word itself and another for the number
of guesses allowed.
3. Create two instances of it and print both to the console */

/* Challenge 92 Video: Hangman Challenge Part 1 
1. Set up the word instance property as an array of lower case letters, each
letter being a member of the array.
2. Set up another instance property to store guessed letters
3. Create a method that gives you the word puzzle back 
No guesses? --> *** 
Guessed "c", "b", and "t"? -> c*t */

/* Video 97 Challenge Part 1
1. Display the puzzle to the browser instead of the console
2. Display the guesses left to the browser instead of the console
3. Separate the Hangman definition code from the rest of the app code (using the app.js file). Keep const Hangman
in the hangman.js file */

/* Video 97 Challenge Part 2
You can be in one of three states: 
- Playing the game (haven't won, haven't lost)
- Failed the game by running out of guesses
- Won the game
1. Set up a new status property for all instances of the game
2. Create a method for recalculating statis to "playing", "finished", or "failed"
3. Call the method after a guess is processed
4. Use console.log to print the status for now
Test it out: 
- Start the game and see "playing"
- Make two incorrect guesses and see "failed"
- Refresh the browser and guess "c", "a", and "t" to see "finished" */

/* Video 98 Challenge 
1. Disable new guesses unless status is playing. Do this by modifying the guess method to do nothing if the game is finished
2. Set up a new method to get back a status message that we will print to the DOM. The message will depends on the status:
Playing -> Guesses left: number of guesses
Failed -> Game over! The word was "cat". You can use "join" method on array to do this.
Finished -> Great work! You guessed the word.
*/

/* Video 101 Challenge 
1. Convert 'getStatusMessage' to a custom getter for 'statusMessage'
2. Convert 'getPuzzle' to a custom getter for 'puzzle' 
3. Change the usage in app.js */
