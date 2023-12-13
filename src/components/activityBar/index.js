import { Link } from 'react-router-dom'
import './styles.scss'

const ActivityBar = () => {
    return (
        <div className='ActivityBar'>
            <Link to="/temp/1">
                <div>1</div>
            </Link>
            <Link to="/temp/2">
                <div>2</div>
            </Link>
            <Link to="/temp/3">
                <div>3</div>
            </Link>
            <Link to="/temp/4">
                <div>4</div>
            </Link>
            <Link to="/temp/5">
                <div>5</div>
            </Link>
        </div>
    )
}
export default ActivityBar