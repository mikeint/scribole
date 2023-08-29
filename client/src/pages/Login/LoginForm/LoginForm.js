import React, { useState } from 'react';  
import axios from 'axios';
import AuthFunctions from '../../../AuthFunctions';
import { Redirect } from 'react-router-dom';

import './LoginForm.scss';

const LoginForm = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
 
    const Auth = new AuthFunctions(); 

    const setEmailState = (e)=> setEmail(e.target.value)
    const sePwState = (e)=> setPassword(e.target.value)

    const login = () => {
        axios.post('https://hrwgt9xpfh.execute-api.ca-central-1.amazonaws.com/dev/api/users/login', {
            email: email,
            password: password
        })
        .then((res)=>{
            let token = res.data.token.replace(/Bearer/g, '').trim();

            Auth.setToken(token);
            
            Auth.setUser(res.data.user, () => {
                setUser(res.data.user)
            })
        }).catch((error) => {
            setError(true);
            console.log(error.config);
        });
    };
 
 
    if (user) {
        if(Auth.loggedIn())
            return <Redirect to='/introduction' user={Auth.getUser()} />
    }
    
    return (
        <>
            <h1 className="">Sign In</h1>
            <div className="loginInput"> 
                <input placeholder="email" name='email' type='text' onChange={setEmailState} value={email} required />
            </div>
            <div className="loginInput"> 
                <input placeholder="password" name='password' type='password' onChange={sePwState} value={password} required />
            </div>
            {error ? <div className='loginError'>Your email or password is incorrect.</div>:''}
            <input onClick={login} type="submit" value="Login" className="loginBtn" />
		</> 
    );
}

export default LoginForm;
