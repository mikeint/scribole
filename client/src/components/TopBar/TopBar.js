 
import { Link } from 'react-router-dom';
import './TopBar.scss'; 

const TopBar = () => {

    return (
        <div className="topBar">
            <Link to='/games' className='logo'></Link>
        </div>
    );
};

export default TopBar;
