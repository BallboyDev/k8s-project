import { useEffect } from 'react'

import tempData from './temp.json'
import './styles.scss'
import Root from './root'

const Tree = () => {
    const roots = Object.keys(tempData)

    // const post = require(`${process.env.PUBLIC_URL}/post/svelte/4장 블록 구조.md`)

    useEffect(() => {
        console.log(process.env.PUBLIC_URL)
        const baseUrl = process.env.PUBLIC_URL
        // readFile(`${baseUrl}/post/svelte/4장 블록 구조.md`).then((res) => {
        //     console.log('res >>> ', res)
        // })
    }, [])

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