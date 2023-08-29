import { useState, React } from 'react';
import './Account.scss';  
import NavBar from '../../components/NavBar/NavBar';
import { Redirect } from "react-router-dom";
import AuthFunctions from '../../AuthFunctions'; 
import TopBar from '../../components/TopBar/TopBar';

const Account = (props) => {
    const [logout, setLogout] = useState(false)
    const Auth = new AuthFunctions();

    const handleLogout = () => {
        Auth.logout();
        setLogout(true);
    } 

    if(logout){
        return <Redirect to='/login'/>
    }
    return (
        <>
            <TopBar />
            <NavBar />
            <div className='accountContainer'>
                <div className="userInfo">Looking good, {props.user.name}</div>
                <div className="userInfo">{props.user.email}</div> 
                <a className="logoutBtn" href='/login' target='' onClick={handleLogout}>Log Out</a>
            </div>
        </>
    )
}

export default Account;
