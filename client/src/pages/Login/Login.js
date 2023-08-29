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
            <div className="loginContainer">
                <div className="loginContent">
                    {tabState === "1" ? <LoginForm /> : <RegisterForm/>}
                </div>
                <div id="loginTabContainer" className="loginTabContainer"> 
                    <div className={tabState==="1" ? "loginTabItem active" : "loginTabItem"} onClick={() => changeTab("1")}>Login</div>
                    <div className={tabState==="2" ? "loginTabItem active" : "loginTabItem"} onClick={() => changeTab("2")}>Register</div>
                </div>
            </div>  
        </div>  
    );
}

export default Login;

