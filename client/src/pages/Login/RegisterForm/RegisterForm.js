import React, { useState } from 'react';  
import axios from 'axios';
import AuthFunctions from '../../../AuthFunctions';
import { Redirect } from 'react-router-dom';

import './RegisterForm.scss';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorList, setErrorList] = useState('');
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');

	const Auth = new AuthFunctions();
 
    const setNameState = (e)=> setName(e.target.value)
    const setEmailState = (e)=> setEmail(e.target.value)
    const setPasswordState = (e)=> setPassword(e.target.value)
    const setPassword2State = (e)=> setPassword2(e.target.value)
	

	const register = (e) => {
		e.preventDefault();

		const newUser = {
			name: name,
			email: email,
			password: password,
			password2: password2
		};
		console.log(newUser)

		axios.post('https://ir3me5vi29.execute-api.ca-central-1.amazonaws.com/api/users/register', newUser)
		.then((res)=>{
			axios.post('https://ir3me5vi29.execute-api.ca-central-1.amazonaws.com/api/users/login', {
				email: res.data.email,
				password: password
			}).then((res)=>{
				Auth.clearToken();
				let token = res.data.token.replace(/Bearer/g, '').trim();

				Auth.setToken(token, ()=>{
					setToken(token)
				});
				Auth.setUser(res.data.user, ()=> {
					setUser(res.data.user)
				});
			})
		})
		.catch(errors => 
			showErrors(errors)
		);  
	}

  	const showErrors = (errors) => {
	
		var tmpErrList = [];
		var errArr = errors.response.data;
		for (var key in errArr) {
			if (errArr.hasOwnProperty(key)) {  
				tmpErrList.push(errArr[key]);
			}
		}
		setErrorList(tmpErrList);
	}
 
	if (user) {
        if(Auth.loggedIn())
            return <Redirect to='/introduction' user={Auth.getUser()} />
    }
	
    return (
       
        <div className="container">
			<h1>Sign Up</h1> 
			{/* <form onSubmit={this.register}> */}

				<div className="loginInput"> 
					<input type="text" className="formControl" placeholder="username" name="name" value={name} onChange={setNameState} required />
				</div>
				<div className="loginInput"> 
					<input type="email" className="formControl" placeholder="email" name="email" value={email} onChange={setEmailState} required />
				</div>
				<div className="loginInput">
					<input type="password" placeholder="password" name="password" value={password} onChange={setPasswordState} required />
				</div>
				<div className="loginInput">
					<input type="password" placeholder="confirm password" name="password2" value={password2} onChange={setPassword2State} required />
				</div>
				<div className="errorsList">
					{
						errorList ?
							<ul>
								{errorList.map((item, i) => {
									return (<li key={i} className="errorItem">{item}</li>);
								})}
							</ul>
						:
						"" 
					}
				</div>
 
				<input onClick={register} type="submit" className="loginBtn" value="Register" />
			{/* </form> */}
		</div> 
    );
}

export default RegisterForm;
