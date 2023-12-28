import React, { useState, useEffect } from 'react'
import './styles.scss'
import Folder from './folder'
import File from './file'

const Root = ({ data }) => {
    const { title, desc, id, type } = data
    const { _include } = data
    const [isOpen, setIsOpen] = useState(false)

    const onClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={'Root'}>
            <div className={'Root__title'} onClick={onClick}>
                <div>{isOpen ? '▼' : '▶'}&nbsp;&nbsp;</div>
                <div >{title}</div>
            </div>
            {
                isOpen && _include.map((v, i) => {
                    if (v.type === 'folder') {
                        return <Folder key={`${v.id}-${i}`} data={v} />
                    } else {
                        return <File key={`${v.id}-${i}`} data={v} />
                    }
                })
            }
        </div>

    )
}

export default Root