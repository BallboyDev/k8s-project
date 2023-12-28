import { useEffect } from 'react'

// import tempData from './tempData/blog.json'
import tempData from './tempData/temp.json'
import newData from './tempData/new.json'
import './styles.scss'
import Root from './root'
import File from './file'

const Tree = ({ selectItem, supportBtn }) => {
    const roots = Object.keys(tempData).sort((a, b) => !!tempData[a]?.type ? (!!tempData[b]?.type ? (tempData[a]?.index - tempData[b]?.index) : 1) : (!!tempData[b]?.type ? -1 : (a > b ? 1 : -1)))
    const roots_v2 = newData

    roots_v2.map((v, i) => { console.log(v) })


    return (
        <div className={'FileTree'}>
            <div className={'FileTree__buttonGroup'}>
                {
                    supportBtn.map((v, i) => {
                        return (<div className={''} onClick={v.func}>{v.title}</div>)
                    })
                }
            </div>
            <div>
                {
                    roots_v2.map((v, i) => {
                        if (v.type === 'folder' || v.type === 'root') {
                            return <Root key={`${v.id}-${i}`} data={v} selectItem={selectItem} />
                        } else {
                            return <File key={`${v.id}-${i}`} data={v} selectItem={selectItem} />
                        }

                    })
                }
            </div>
        </div>
    )
}

export default Tree;