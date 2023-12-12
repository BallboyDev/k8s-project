import { useEffect } from 'react'
import Tree from '../../components/tree'

import './styles.scss'

const Blog = () => {
    useEffect(() => {
        console.log('ballboy test')

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