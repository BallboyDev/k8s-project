import { useState, useEffect } from 'react'
import Tree from '../../components/tree'
import { Octokit } from "@octokit/core"
import './styles.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ActivityBar from '../../components/activityBar'

const posting = async () => {
    const octokit = new Octokit({ auth: process.env.REACT_APP_TOKEN })
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_GITHUB_URL}/study/master/database/ORACLE/2. 데이터 유형.md`)

        const post = await octokit.request('POST /markdown', {
            text: data,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'text/plain'
            }
        })

        return post.data
    } catch (ex) { }
}

const Blog = () => {
    const [post, setPost] = useState('<></>')

    useEffect(() => {
        posting().then((res) => {
            setPost(res)
        })
    }, [])



    return (
        <div className='Blog'>
            <div className='Blog__nav'>
                <Tree />
            </div>
            <div className='Blog__content'>content</div>
            {/* <div className='Blog__content' dangerouslySetInnerHTML={{ __html: post || '<></>' }} /> */}
        </div>
    )
}

export default Blog