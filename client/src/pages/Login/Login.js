import React, { useState } from "react";
import './Login.scss'; 

import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

const Login = () => { 
    const [tabState, setTabState] = useState('1'); 
    const changeTab = (tab) => {
        setTabState(tab);
    } 
    return ( 
        <div className="gradientContainer">
            <div className="loginMiddle">
                <div className="loginContent">
                    {
                        tabState === "1" ?
                        <div><LoginForm /></div>
                        :
                        <div><RegisterForm/></div>
                    }

                </div>
                <div id="tabContainer" className="tabContainer"> 
                    <div className={tabState==="1" ? "tab-item active" : "tab-item"} onClick={() => changeTab("1")}>Login</div>
                    <div className={tabState==="2" ? "tab-item active" : "tab-item"} onClick={() => changeTab("2")}>Register</div>
                </div>
            </div>  
        </div>  
    );
}

export default Login;

