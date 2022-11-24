import React from 'react'
import Letter from './Letter'

function Attempt({ attemptNum }) {
    return (
        <>
            <Letter attempt={attemptNum} letterPos={0}/>
            <Letter attempt={attemptNum} letterPos={1} />
            <Letter attempt={attemptNum} letterPos={2} />
            <Letter attempt={attemptNum} letterPos={3} />
            <Letter attempt={attemptNum} letterPos={4} />
        </>
    )
}

export default Attempt