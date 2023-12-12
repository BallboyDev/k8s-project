import { useEffect } from 'react'

import tempData from './temp.json'
import './styles.scss'
import Root from './root'

const Tree = () => {
    const roots = Object.keys(tempData)

    return (

        <div className={'FileTree'}>
            <div className={'FileTree__buttonGroup'}>
                <div className={''} onClick={() => {

                }} >
                    test
                </div>
                {/* <div className={''} onClick={() => { }}>
                    2
                </div>
                <div className={''}>
                    3
                </div> */}
            </div>
            <div>
                {
                    roots.map((v, i) => {
                        return (
                            <Root key={`${v}${i}`} title={v} tree={tempData[v]} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tree;