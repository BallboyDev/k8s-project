import React, { useState, useEffect } from 'react'
import './styles.scss'
import Folder from './folder'
import File from './file'

const Root = ({ title, tree, selectItem }) => {
    const [open, setOpen] = useState(false)
    const { _id, ...branch } = tree

    const items = Object.keys(branch).sort((a, b) => !!tree[a]?.type ? (!!tree[b]?.type ? (tree[a]?.index - tree[b]?.index) : 1) : (!!tree[b]?.type ? -1 : (a > b ? 1 : -1)))

    const onClick = () => {
        const openPost = localStorage.getItem('openPost')
        localStorage.setItem('openPost', !open ? `${openPost}${_id}|` : openPost.replaceAll(`|${_id}|`, '|'))
        setOpen(!open)
    }

    useEffect(() => {
        const openPost = localStorage.getItem('openPost') || '|'
        setOpen(openPost.indexOf(`|${_id}|`) >= 0)
    }, [])

    return (
        <div className={'Root'}>
            <div className={'Root__title'} onClick={onClick}>
                <div>{open ? '▼' : '▶'}&nbsp;&nbsp;</div>
                <div >{_id}/{title}</div>
            </div>
            {
                open && items.map((v, i) => {
                    return (
                        // typeof tree[v] === 'object' ?
                        !(!!tree[v]?.type) ?
                            <Folder key={`${v}${i}`} title={v} path={`${title}/${v}`} tree={tree[v]} selectItem={selectItem} /> :
                            <File key={`${v}${i}`} title={v} path={`${title}/${v}`} tree={tree[v]} selectItem={selectItem} />
                    )
                })
            }
        </div>

    )
}

export default Root