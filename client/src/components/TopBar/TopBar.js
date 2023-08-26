 
import { Link } from 'react-router-dom';
import './TopBar.scss'; 

const TopBar = () => {

    return (
        <div className="topBar">
            <Link to='/games' className='logo'></Link>
            <div className='eggGif'></div>
        </div>
    );
};

export default TopBar;
