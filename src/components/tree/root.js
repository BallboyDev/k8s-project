import React, { useState } from 'react'
import './styles.scss'
import Folder from './folder'
import File from './file'

const Root = ({ title, tree }) => {
    const [open, setOpen] = useState(false)

    const items = Object.keys(tree).sort((a, b) => !!tree[a]?.type ? (!!tree[b]?.type ? (tree[a]?.index - tree[b]?.index) : 1) : (!!tree[b]?.type ? -1 : (a > b ? 1 : -1)))

    const onClick = () => {
        console.log(`ballboy ${title} >>>`, tree)
        setOpen(!open)
    }

    return (
        <div className={'Root'}>
            <div className={'Root__title'} onClick={onClick}>
                <div>{open ? '▼' : '▶'}&nbsp;&nbsp;</div>
                <div>{title}</div>
            </div>
            {
                open && items.map((v, i) => {
                    return (
                        // typeof tree[v] === 'object' ?
                        !(!!tree[v]?.type) ?
                            <Folder key={`${v}${i}`} title={v} path={`${title}/${v}`} tree={tree[v]} /> :
                            <File key={`${v}${i}`} title={v} path={`${title}/${v}`} tree={tree[v]} />
                    )
                })
            }
        </div>

    )
}

export default Root