import React, { useState } from 'react'

import File from './file'
import './styles.scss'

const Folder = ({ title, path, tree }) => {
    const [open, setOpen] = useState(false)

    const items = Object.keys(tree).sort((a, b) => !!tree[a]?.type ? (!!tree[b]?.type ? (tree[a]?.index - tree[b]?.index) : 1) : (!!tree[b]?.type ? -1 : (a > b ? 1 : -1)))

    const onClick = () => {
        // console.log(`ballboy ${title} >>>`, path, tree)
        setOpen(!open)
    }

    return (
        <div className={'Folder'}>
            <div className={'Folder__title'} onClick={onClick}>
                <div>{open ? '▼' : '▶'}&nbsp;&nbsp;</div>
                <div >{title}</div>
            </div>
            {
                open && items.map((v, i) => {
                    return (
                        !(!!tree[v]?.type) ?
                            <Folder key={`${v}${i}`} title={v} path={`${path}/${v}`} tree={tree[v]} /> :
                            <File key={`${v}${i}`} title={v} path={`${path}/${v}`} tree={tree[v]} />
                    )
                })
            }
        </div>

    )
}

export default Folder