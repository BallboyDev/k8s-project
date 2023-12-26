import { useEffect } from 'react'

// import tempData from './tempData/blog.json'
import tempData from './tempData/temp.json'
import './styles.scss'
import Root from './root'
import File from './file'

const Tree = ({ selectItem }) => {
    const roots = Object.keys(tempData).sort((a, b) => !!tempData[a]?.type ? (!!tempData[b]?.type ? (tempData[a]?.index - tempData[b]?.index) : 1) : (!!tempData[b]?.type ? -1 : (a > b ? 1 : -1)))

    return (
        <div className={'FileTree'}>
            <div className={'FileTree__buttonGroup'}>
                <div className={''} onClick={() => { }}>1</div>
                <div className={''} onClick={() => { }}>2</div>
                <div className={''} onClick={() => { }}>3</div>
                <div className={''} onClick={() => {
                    localStorage.setItem('openPost', '|')
                }}>4</div>
            </div>
            <div>
                {
                    roots.map((v, i) => {
                        return (
                            !(!!tempData[v]?.type) ?
                                <Root key={`${v}${i}`} title={v} tree={tempData[v]} selectItem={selectItem} /> :
                                <File key={`${v}${i}`} title={v} path={`${v}`} tree={tempData[v]} selectItem={selectItem} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tree;