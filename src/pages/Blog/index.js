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

        const baseUrl = process.env.REACT_APP_GITHUB_URL
        const fileUrl = url
        const { data } = await axios.get(`${baseUrl}${fileUrl}`)

        const conversion = MarkdownIt().render(data)

        return conversion
    } catch (ex) { }
}

const Blog = () => {
    const [post, setPost] = useState('<></>')
    const [postList, setPostList] = useState([])

    const selectItem = (data) => {
        setPostList([...postList, data])


        // console.log(fetch(require('../../_post/test.md')).then(res => res.text()))
        posting(data.url).then((res) => {
            setPost(res)
        })
    }

    useEffect(() => {
        const openPost = localStorage.getItem('openPost')
        if (!openPost || (openPost.trim() === '')) {
            localStorage.setItem('openPost', '|')
        }
    }, [])



    return (
        <div className='Blog'>
            <div className='Blog__nav'>
                <Tree selectItem={selectItem} />
            </div>
            <div className='Blog__content'>
                {
                    postList.length === 0 ?
                        <Intro /> : <>
                            <div className='Blog__content__titles'>
                                {
                                    postList.map((v) => {
                                        return <div className='Blog__content__titles__title'>{v.title}</div>
                                    })
                                }
                            </div>
                            <article className='markdown-body' dangerouslySetInnerHTML={{ __html: post || '<h2>Loading...</h2>' }} />
                        </>
                }
            </div>
        </div>
    )
}

export default Blog