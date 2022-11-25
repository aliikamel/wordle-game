import React, { useEffect, useState } from "react"
import { createContext } from "react"
import './App.css'
import Board from "./Board"
import Keyboard from "./Keyboard"
import GameOver from "./GameOver"
import { boardDefault, generateWordSet } from "./Words"
import CreateIcon from '@mui/icons-material/Create';


export const AppContext = createContext();

function App() {
    const apiURL = "https://random-word-api.herokuapp.com/word?length=5"
    const [board, setBoard] = useState(boardDefault)
    const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPos: 0 })
    const [wordSet, setWordSet] = useState(new Set())
    const [disabledLetters, setDisabledLetters] = useState([])
    const [correctLetters, setCorrectLetters] = useState([])
    const [almostLetters, setAlmostLetters] = useState([])
    const [correctWord, setCorrectWord] = useState("")
    const [gameOver, setGameOver] = useState({
        gameOver: false,
        guessedWord: false
    })


    useEffect(() => {
        generateWordSet()
            .then((words) => {
                setWordSet(words.wordSet)
                setCorrectWord(words.todaysWord.toUpperCase())
                console.log(words.todaysWord)
            })
    }, [])

    const onSelectLetter = (keyVal) => {
        if (currentAttempt.letterPos > 4) return;
        const newBoard = [...board]
        newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
        setCurrentAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos + 1 })
        setBoard(newBoard)
    }

    const onDelete = () => {
        if (currentAttempt.letterPos === 0) return;
        const newBoard = [...board]
        newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
        setBoard(newBoard)
        setCurrentAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos - 1 })
    }

    const onEnter = () => {
        if (currentAttempt.letterPos != 5) return;
        let currWord = "";
        for (let i = 0; i < 5; i++) {
            currWord += board[currentAttempt.attempt][i]
        }

        if (wordSet.has(currWord.toLowerCase())) {
            setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 });
        } else {
            alert("Word Not Found")
            console.log(wordSet)
        }

        if (currWord === correctWord) {
            setGameOver({ gameOver: true, guessedWord: true });
            return;
        } else if (currentAttempt.attempt === 5 && currWord !== correctWord && wordSet.has(currWord.toLowerCase())) {
            setGameOver({ gameOver: true, guessedWord: false });
        }

    }

    return (
        <div className="app-container">
            <nav>
                <h1>Cham Wordle   <CreateIcon fontSize="12px"/></h1>
            </nav>
            <AppContext.Provider value={{
                board,
                setBoard,
                currentAttempt,
                setCurrentAttempt,
                onSelectLetter,
                onDelete,
                onEnter,
                correctWord,
                disabledLetters,
                setDisabledLetters,
                correctLetters,
                setCorrectLetters,
                almostLetters,
                setAlmostLetters,
                gameOver,
                setGameOver
            }}>
                <Board />
                {gameOver.gameOver ? <GameOver /> : <Keyboard />}
            </AppContext.Provider>
            {gameOver.gameOver &&
                <div className="gameover-btn">
                    <a href="/">
                        <button className="btn">Play Again</button>
                    </a>
                </div>
            }
        </div>
    )
}

export default App