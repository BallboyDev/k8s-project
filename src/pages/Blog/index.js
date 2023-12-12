import { useEffect } from 'react'
import Tree from '../../components/tree'

import './styles.scss'
import axios from 'axios'

const { Octokit } = require("@octokit/core")

const Blog = () => {
    useEffect(() => {
        console.log('ballboy test')
        axios.get(`${process.env.REACT_APP_GITHUB_URL}/study/master/database/MongoDB/2_CRUD.md`).then((res) => {
            console.log(res.data)

            const octokit = new Octokit({ auth: process.env.REACT_APP_TOKEN })
            octokit.request('POST /markdown', {
                text: res.data,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Content-Type': 'text/plain'
                }
            }).then((res) => {
                console.log('ballboy res >>> ', res)
            }).catch((ex) => {
                console.log('ballboy ex >>> ', ex)
            })
        })
    }, [])

    return (
        <div className='Blog'>
            <div className='Blog__nav'>
                <Tree />
            </div>
            <div className='Blog__content'>content</div>
        </div>
    )
}

export default Blog