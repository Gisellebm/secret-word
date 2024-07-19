import { wordsList } from './data/words';
import './App.css';
import StartScreen from './components/StartScreen';
import { useState } from 'react';
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickWord] = useState('');
  const [pickedCategory, setPickCategory] = useState('');
  const [guesses, setGuesses] = useState(3);
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
    console.log(letter);
  }

  // restarts the game
  const retry = () => { 
    setGameStage(stages[0].name);
  }

  console.log(words);

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
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
