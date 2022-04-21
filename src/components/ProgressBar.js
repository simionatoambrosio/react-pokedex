import React from 'react'
import './ProgressBar.css'

function ProgressBar({ value, label }) {
    return (
        <div className='input-content'>
            <div className='input-values'>
                <label for={label}>{label}</label>
                <div>{value}</div>
            </div>
            <input type="range" max="255" value={value} name={label}></input>

        </div>
    )
}

export default ProgressBar