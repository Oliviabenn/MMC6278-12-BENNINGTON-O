const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.correctLetters = []
    this.incorrectLetters = []
}
  //
  guessLetter(letter) {
    if (this.incorrectLetters.includes(letter)||!/^[a-z]$/i.test(letter)){
      return
    }
    if (this.word.includes(letter)){
      this.correctLetters.push(letter)
      var matchingLocations =[]
      for (var i=0; i<this.word.length; i++){
        if (this.word[i] === letter){
          matchingLocations.push(i);
        }
      }
      for (var j=0; j<matchingLocations.length; j++){
        this.displayWord=`${this.displayWord.substring(0,matchingLocations[j])}${letter}${this.displayWord.substring(matchingLocations[j]+1)}`
      }
    }
    else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses --
    }
  }
  updateScreen() {
    document.getElementById("word-to-guess").innerHTML = this.displayWord;
    document.getElementById("incorrect-letters").innerHTML = this.incorrectLetters;
    document.getElementById("remaining-guesses").innerHTML = this.remainingGuesses;
  }

isGameOver() {
  if (this.displayWord !== this.word && this.remainingGuesses > 0){
    return false
  }
    return true
}

getWinOrLoss() {
  if (this.displayWord === this.word && this.remainingGuesses > 0) {
    return 'win'
  } else if (this.displayWord !== this.word && this.remainingGuesses <= 0) {
    return 'loss'
  } else if (this.displayWord !== this.word && this.remainingGuesses > 0) {
    return null
  }
}
select(keys) {
  return /^[a-z]/.test(keys)
}
}
//
function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}
newGame()
