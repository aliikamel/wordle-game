import React, { useContext, useEffect } from 'react'
import { AppContext } from "./App"



function Letter({ letterPos, attempt }) {
    const { board, correctWord, currentAttempt, setDisabledLetters, setCorrectLetters, setAlmostLetters } = useContext(AppContext);
    const letter = board[attempt][letterPos];

    const correct = correctWord[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.includes(letter)


    const letterState = currentAttempt.attempt > attempt &&
        (correct ? "correct" : almost ? "almost" : "wrong");

    useEffect(() => {
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters((prev) => [...prev, letter])
        } else if (letter !== "" && correct){
            setCorrectLetters((prev) => [...prev, letter])
        } else if (letter !== "" && almost){
            setAlmostLetters((prev) => [...prev, letter])
        }
    }, [currentAttempt.attempt])

    return (
        <div className='letter' id={letterState}> {letter}</div>
    )
}

export default Letter