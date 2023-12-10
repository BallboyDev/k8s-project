import React, { useState } from 'react'
import './styles.scss'

const File = ({ title, path }) => {
    const onClick = () => {
        console.log(`ballboy ${title} >>>`, path)
    }

    return (
        <div className={'File'} onClick={onClick}>{title}</div>
    )
}

export default File