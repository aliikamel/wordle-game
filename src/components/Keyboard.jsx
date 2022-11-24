import React, { useCallback, useEffect, useContext } from 'react'
import { AppContext } from "./App"
import Key from './Key';

function Keyboard() {
    const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    const allKeys = keys1.concat(keys2.concat(keys3));
    const {
        onDelete,
        onSelectLetter,
        onEnter,
        disabledLetters,
        correctLetters,
        almostLetters
    } = useContext(AppContext);



    const handleKeyboard = useCallback((e) => {
        if (e.key === 'Enter') {
            onEnter();
        } else if (e.key === 'Backspace') {
            onDelete();
        } else {
            allKeys.forEach(key => {
                if (key === e.key.toUpperCase()) {
                    onSelectLetter(key);
                }
            })
        }
    })


    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard);

        return () => {
            document.removeEventListener('keydown', handleKeyboard);
        };
    }, [handleKeyboard])

    return (
        <div className='keyboard' onKeyDown={handleKeyboard}>
            <div className='keyboard-top'>
                {keys1.map(key => {
                    return <Key
                        keyVal={key}
                        almost={almostLetters.includes(key)}
                        correct={correctLetters.includes(key)}
                        disabled={disabledLetters.includes(key)}
                    />
                })}
            </div>
            <div className='keyboard-mid'>
                {keys2.map(key => {
                    return <Key
                        keyVal={key}
                        almost={almostLetters.includes(key)}
                        correct={correctLetters.includes(key)}
                        disabled={disabledLetters.includes(key)}
                    />
                })}
            </div>
            <div className='keyboard-bottom'>
                <Key keyVal="ENTER" bigKey={true} />
                {keys3.map(key => {
                    return <Key
                        keyVal={key}
                        almost={almostLetters.includes(key)}
                        correct={correctLetters.includes(key)}
                        disabled={disabledLetters.includes(key)}
                    />
                })}
                <Key keyVal={"DELETE"} bigKey={true} />
            </div>
        </div>
    )
}

export default Keyboard