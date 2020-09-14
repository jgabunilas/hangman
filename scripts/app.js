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
    word1.updatePicture()
}

/* Let's set up a function that allows you to start a game */

const startHangmanGame = async () => {
    const puzzle = await getPuzzle('2')
    word1 = new Hangman(puzzle, 6)
    renderGame()
}

/* Initialize the game bu calling startHangmanGame */
startHangmanGame()

/* Set up an event listener to reset the game when the reset button is clicked */
document.querySelector('#reset').addEventListener('click', (e) => {
    startHangmanGame()
})

// Initialize the image of the gallows within the picture DOM element
var img = document.createElement('img')
img.src = 'images/hangman6guesses.png'
document.getElementById('picture').appendChild(img)