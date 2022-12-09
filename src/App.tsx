import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";


function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}


function App() {
  const [wordToGuess, setWordToGuess] = useState(() => getWord());

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )
  
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))


  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return;

    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault();
      addGuessedLetter(key);
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [guessedLetters]);


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [])


  return (
    <div
      style={{
        maxWidth: "90vw",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        marginTop: "2rem",
        marginLeft: "0 auto",
        // alignItems: "center"
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          minWidth: "55vw",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "0 auto",
          alignItems: "center"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: "bold", borderBlockEnd: "1px solid black", fontSize: "48px" }}>Hangman - Guess the Word</h1>
          <h2 style={{ height: "100px", margin: "0 auto", color: isWinner ? "blue" : isLoser ? "red" : "black", fontSize: "30px" }}>
            {isWinner ? "Congratulations! You Won, Press Enter to Start Over"
              : isLoser ? "You Lost, Press Enter to Start Over"
              : "Press Any Key to Start"
            }
          </h2>
        </div>
        <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} reveal={isLoser} />
        <div style={{ alignSelf: "stretch" }}>
          <Keyboard
            activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
            disabled={isWinner || isLoser}
          />
        </div>
        
      </div>
      <div
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          // margin: "0 auto",
          // alignItems: "center"
        }}
      >
        <div style={{ marginTop: "3rem" }}>
          <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
          <button
            style={{
              display: "flex",
              fontSize: "2rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginLeft: "30px",
              marginTop: "80px"
            }}
            onClick={() => (
              setGuessedLetters([]),
              setWordToGuess(getWord())
            )}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
