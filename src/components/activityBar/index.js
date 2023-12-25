import { Link } from 'react-router-dom'
import './styles.scss'

const ActivityBar = () => {
    return (
        <div className='ActivityBar'>
            <Link to="Blog">
                <div>1</div>
            </Link>
            <Link to="Tools">
                <div>2</div>
            </Link>
            <Link to="Ide">
                <div>3</div>
            </Link>
            <Link to="/">
                <div>4</div>
            </Link>
            <Link to="/">
                <div>5</div>
            </Link>
        </div>
    )
}
export default ActivityBar