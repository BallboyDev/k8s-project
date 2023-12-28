import { useState, useEffect } from 'react'
import Tree from '../../components/tree'
import Intro from '../../components/intro'
import './styles.scss'
import axios from 'axios'
import MarkdownIt from 'markdown-it'


const posting = async (url) => {
    try {
        // const baseUrl = process.env.REACT_APP_GITHUB_URL
        // const repoBranch = 'jirareport_back/main/'
        // const file = 'ReadMe.md'
        // const { data } = await axios.get(`${baseUrl}${repoBranch}${file}`)

        // const regex = /\!\[([^\]]+)\]\(([^\)]+)\)/g
        // const post = data.split('\n').map((v) => {
        //     return (
        //         regex.test(v)
        //             ? v.replace(regex, `![$1](${baseUrl}${repoBranch}$2)`)
        //             : v
        //     )
        // })

        // const parse3 = MarkdownIt().render(post.join('\n'))

        // return parse3

        const baseUrl = process.env.REACT_APP_GITHUB_URL || 'https://raw.githubusercontent.com/BallboyDev/'
        const fileUrl = url
        const { data } = await axios.get(`${baseUrl}${fileUrl}`)

        const conversion = MarkdownIt().render(data)

        return conversion
    } catch (ex) { }
}

const Blog = () => {
    const [currentPost, setCurrentPost] = useState('<></>')
    const [postList, setPostList] = useState([])

    useEffect(() => {
        const openList = localStorage.getItem('openList')
        if (!openList) {
            console.log(1)
            localStorage.setItem('openList', JSON.stringify([]))
            setPostList([])
        } else {
            const temp = JSON.parse(openList)

            if (temp.length > 0) {
                console.log(2, temp)
                setPostList(temp)

                posting(temp[0]._data).then((res) => {
                    setCurrentPost(res)
                })
            }
        }
    }, [])

    const selectItem = async (item) => {
        // 아이템 중복 경우 해결
        const temp = postList.some((v) => { return v.id === item.id })
        if (!temp) {
            if (postList.length >= 5) {
                const [first, ...others] = postList
                localStorage.setItem('openList', JSON.stringify([...others, item]))
                setPostList([...others, item])
            } else {
                localStorage.setItem('openList', JSON.stringify([...postList, item]))
                setPostList([...postList, item])
            }
        }
        setCurrentPost(await posting(item._data))

    }
    const supportBtn = [
        {
            title: 'a',
            tooltip: '',
            func: () => { }
        },
        {
            title: 'b',
            tooltip: '',
            func: () => { }
        },
        {
            title: 'c',
            tooltip: '',
            func: () => { }
        },
        {
            title: 'd',
            tooltip: '',
            func: () => {
                localStorage.clear()
            }
        },
    ]

    return (
        <div className='Blog'>
            <div className='Blog__nav'>
                <Tree selectItem={selectItem} supportBtn={supportBtn} />
            </div>
            <div className='Blog__content'>
                {
                    postList.length === 0 ?
                        <Intro /> :
                        <>
                            <div className='Blog__content__titles'>
                                {
                                    postList.map((v, i) => {
                                        return (
                                            <div
                                                key={`${v.id}-${i}`}
                                                className='Blog__content__titles__title'
                                                onClick={() => { selectItem(v) }}>
                                                <div>{i + 1} / {v.title}</div>
                                                {/* <div>X</div> */}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <article className='markdown-body' dangerouslySetInnerHTML={{ __html: currentPost || '<h2>Loading...</h2>' }} />
                        </>
                }
            </div>
        </div>
    )
}

export default Blog