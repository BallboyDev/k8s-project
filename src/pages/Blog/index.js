import { useState, useEffect } from 'react'
import Tree from '../../components/tree'
import Intro from './intro'
import './styles.scss'
import axios from 'axios'
import MarkdownIt from 'markdown-it'


const posting = async () => {
    try {
        const baseUrl = process.env.REACT_APP_GITHUB_URL
        const repoBranch = 'jirareport_back/main/'
        const file = 'ReadMe.md'
        const { data } = await axios.get(`${baseUrl}${repoBranch}${file}`)

        const regex = /\!\[([^\]]+)\]\(([^\)]+)\)/g
        const post = data.split('\n').map((v) => {
            return (
                regex.test(v)
                    ? v.replace(regex, `![$1](${baseUrl}${repoBranch}$2)`)
                    : v
            )
        })

        const parse3 = MarkdownIt().render(post.join('\n'))
        // console.log(parse3)

        return parse3
    } catch (ex) { }
}

const Blog = () => {
    const [post, setPost] = useState('<></>')

    useEffect(() => {

        console.log(fetch(require('../../_post/test.md'))
            .then(res => res.text()))

        posting().then((res) => {
            setPost(res)
        })
    }, [])



    return (
        <div className='Blog'>
            <div className='Blog__nav'>
                <Tree />
            </div>
            <div className='Blog__content'>
                <Intro />
                {/* <div className='Blog__content__titles'>
                    <div className='Blog__content__titles__title'>Title1</div>
                    <div className='Blog__content__titles__title'>Title2</div>
                    <div className='Blog__content__titles__title'>Title3</div>
                    <div className='Blog__content__titles__title'>Title4</div>
                    <div className='Blog__content__titles__title'>Title5</div>
                </div>
                <article className='markdown-body' dangerouslySetInnerHTML={{ __html: post || '<h2>Loading...</h2>' }} /> */}
            </div>
        </div>
    )
}

export default Blog