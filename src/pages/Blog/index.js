import { useState, useEffect } from 'react'
import Tree from '../../components/tree'
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
        console.log(parse3)

        return parse3
    } catch (ex) { }
}

const Blog = () => {
    const [post, setPost] = useState('<></>')

    useEffect(() => {
        // // const test = 
        // const reader = new FileReader
        // reader.readAsText(require('../../_post/test.md'))

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
                {/* <div>title</div> */}
                <article className='markdown-body' dangerouslySetInnerHTML={{ __html: post || '<h2>Loading...</h2>' }} />
            </div>
        </div>
    )
}

export default Blog