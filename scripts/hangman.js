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
            message = `Incorrect Guesses Remaining: ${this.attemptsRemaining}. Please choose a letter.`
        } else if (this.status === 'failed') {
            const fullWord = this.word.join('')
            message = `Game over! The word/phrase was "${fullWord}"`
        } else if (this.status === 'finished') {
            message = `Great work! You have guessed the word/phrase!`
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
    // The updatePicture method will change the source of the picture div based on how many guesses are remaining. This is accomplished by setting the source attribute of the div DOM element to the appropriate picture.
    updatePicture() {
        if (this.attemptsRemaining === 6) {
            img.setAttribute('src', 'images/hangman6guesses.png')
        } else if (this.attemptsRemaining === 5) {
            img.setAttribute('src', 'images/hangman5guesses.png')
        } else if (this.attemptsRemaining === 4) {
            img.setAttribute('src', 'images/hangman4guesses.png')
        } else if (this.attemptsRemaining === 3) {
            img.setAttribute('src', 'images/hangman3guesses.png')
        } else if (this.attemptsRemaining === 2) {
            img.setAttribute('src', 'images/hangman2guesses.png')
        } else if (this.attemptsRemaining === 1) {
            img.setAttribute('src', 'images/hangman1guesses.png')
        } else if (this.attemptsRemaining === 0) {
            img.setAttribute('src', 'images/hangman0guesses.png')
        }                            
    }

} 


