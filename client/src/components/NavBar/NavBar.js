 
import { useState, useEffect } from 'react';
import './NavBar.scss';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
      setUrl(location.pathname);
    }, [location]); 

    return (
        <div className="navBar">
            <Link to="/games" className={url === "/games" ? "active" : ""}><div className='navBarIcon navBarIcon1'></div></Link>
            <Link to="/wordGroups" className={url === "/wordGroups" ? "active" : ""}><div className='navBarIcon navBarIcon2'></div></Link>
            <Link to="/scores" className={url === "/scores" ? "active" : ""}><div className='navBarIcon navBarIcon3'></div></Link>
            <Link to="/account" className={url === "/account" ? "active" : ""}><div className='navBarIcon navBarIcon4'></div></Link> 
        </div>
    );
};

export default NavBar;
