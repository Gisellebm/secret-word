import { wordsList } from './data/words';
import './App.css';
import StartScreen from './components/StartScreen';
import { useEffect, useState } from 'react';
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickWord] = useState('');
  const [pickedCategory, setPickCategory] = useState('');
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const pickWordAndCategory = () => {
    // picks a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);
    console.log(category);

    return {word, category};
  }

  // starts the secret word game
  const startGame = () => {
    // clear all letters
    setGuessedLetters([]);

    // pick word and category
    const {word, category} = pickWordAndCategory();
    console.log(word, category);

    // create an array of letters
    let wordLetters = word.split('');
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());
    console.log(wordLetters);

    // fill states
    setPickWord(word);
    setPickCategory(category);
    setLetters(wordLetters)

    setGameStage(stages[1].name);
  }

  // process the letter input
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized

    if (
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearletterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // check if guesses ended
 useEffect(() => {
    if(guesses <= 0) {
      // reset all states
      clearletterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses])

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    // win condition
    if(guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => actualScore += 100)

      // restart game with new word
      startGame();
    }

  }, [guessedLetters, letters, startGame])


  // restarts the game
  const retry = () => { 
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' 
        && <Game 
          verifyLetter={verifyLetter}   
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters} 
          guessedLetters={guessedLetters} 
          guesses={guesses} 
          score={score} 
          wrongLetters={wrongLetters} 
      />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
