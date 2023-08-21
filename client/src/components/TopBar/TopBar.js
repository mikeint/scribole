 
import { Link } from 'react-router-dom';
import './TopBar.scss';

import h1 from '../../images/h1.png';
import h2 from '../../images/h2.png';
import h3 from '../../images/h3.png';
import h4 from '../../images/h4.png';

const TopBar = () => {

    return (
        <div className="topBar">
            <Link to='/games' className='logo'></Link>
            <div className='imageCycler'>
                <img className="fadeCycle fadeCycle-1" src={h1} alt={h1} />
                <img className="fadeCycle fadeCycle-2" src={h2} alt={h2} />
                <img className="fadeCycle fadeCycle-3" src={h3} alt={h3} />
                <img className="fadeCycle fadeCycle-4" src={h4} alt={h4} />
            </div>
        </div>
    );
};

export default TopBar;
