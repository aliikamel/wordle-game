import React, { useContext, useState } from 'react'
import { AppContext } from "./App"
import BackspaceIcon from '@mui/icons-material/Backspace';



function Key({ keyVal, bigKey, disabled, correct, almost }) {
    const { onDelete, onSelectLetter, onEnter } = useContext(AppContext);


    function selectLetter() {
        if (keyVal === "DELETE") {
            onDelete();
        } else if (keyVal === "ENTER") {
            onEnter();
        } else {
            onSelectLetter(keyVal);
        }
    }

    return (
        <div 
        className='key'
        id={bigKey ? "bigKey" : correct ? "correct" : almost ? "almost" : disabled && "disabled"} 
        onClick={selectLetter}>
            {keyVal !== "DELETE" ? keyVal : <BackspaceIcon />}
        </div>
    )
}

export default Key