import React from 'react'
import './title.css'

function Title() {
    return (
        <div className='title'>
            <title>Tic-Tac-Toe game</title>
            <h1>Tic-Tac-Toe</h1>
        </div>
    )
}

function Signature() {
    return (
        <div className='signature'>
            <div>by Shahar Tamir</div>
        </div>
    )
}

export {Title, Signature}