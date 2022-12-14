import React, { useContext } from 'react'
import { AppContext } from './App'

function GameOver() {
    const { gameOver, setGameOver, correctWord, currentAttempt } = useContext(AppContext)

    return (
        <div className='gameOver'>
            <h3>{gameOver.guessedWord ? "You Correctly Guessed The Word!" : "You Failed"}</h3>
            <h1>Correct Word: {correctWord}</h1>
            {gameOver.guessedWord && (<h3>You Guessed in {currentAttempt.attempt} attempts</h3>)}
        </div>
    )
}

export default GameOver