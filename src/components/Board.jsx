import React from 'react'
import { useState } from 'react'
import Attempt from './Attempt'
import './App.css'

function Board() {
    return (
        <div className='board'>
            <div className='row'>
                <Attempt attemptNum={0}/>
            </div>
            <div className='row'>
                <Attempt attemptNum={1} />
            </div>
            <div className='row'>
                <Attempt attemptNum={2} />
            </div>
            <div className='row'>
                <Attempt attemptNum={3} />
            </div>
            <div className='row'>
                <Attempt attemptNum={4} />
            </div>
            <div className='row'>
                <Attempt attemptNum={5} />
            </div>
        </div>
    )
}

export default Board