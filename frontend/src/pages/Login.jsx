import React from 'react'
import { useState } from 'react';
import {ToastContainer} from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSucess } from './utils';


const Login = () => {
    const [loginUpInfo, setLoginUpInfo] = useState({
       
        email : "",
        password: ""
    })


    const handlechange = (e)=>{

        const {name,value} = e.target;
        console.log(name,value);
        const copyloginUpInfo = {...loginUpInfo};
        copyloginUpInfo[name] = value;
        
        setLoginUpInfo(copyloginUpInfo);
        
        
    }
    const navigate = useNavigate();
     const handlelogin = async(e)=>{
        e.preventDefault();
        console.log(loginUpInfo);
        const {email,password} = loginUpInfo;

        if ( !email || !password){
            return handleError("email, password are required");
        }

        try{
           const url = "https://authentication-mern-app-api-beta.vercel.app/auth/login";
           const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginUpInfo),
        });
        const data = await response.json();
        console.log(data);

        const {success,message,jwtToken,name,error } = data;
        
        if(success){
            handleSucess(message);
            localStorage.setItem("token",jwtToken);
            localStorage.setItem("loggedInUser",name);
            setTimeout(()=>{
                navigate('/home');
            },1000)
        }else if(error){
            const details = error?.details[0].message;
            handleError(details);
        }else if(!success){
            handleError(message);
        }
        }
        catch(err){
            handleError(err.message);
        }
       
    }
  return (
    <div className="container">
        <h1>Login</h1>
        <form onSubmit={handlelogin}>
            

            <div>
                <label htmlFor="email"></label>
                <input 
                type="email" 
                name='email'
                autoFocus
                placeholder='Enter your email...'
                 value = {loginUpInfo.email}
                onChange={handlechange}
                />
            </div>

            <div>
                <label htmlFor="password"></label>
                <input 
                type="password" 
                name='password'
                autoFocus
                placeholder='Enter your password...'
                 value = {loginUpInfo.password}
                onChange={handlechange}
                />
            </div>
            <button type='submit'>Login</button>
            <span>New users  ? <Link to='/signup'>Signup</Link></span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login
