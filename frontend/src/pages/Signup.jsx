import React from 'react'
import { useState } from 'react';
import {ToastContainer} from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSucess } from './utils';


const Signup = () => {
    const [sihnUpInfo, setSignupInfo] = useState({
        name: "",
        email : "",
        password: ""
    })


    const handlechange = (e)=>{

        const {name,value} = e.target;
        console.log(name,value);
        const copySignUpInfo = {...sihnUpInfo};
        copySignUpInfo[name] = value;       
        setSignupInfo(copySignUpInfo);        
    }
    const navigate = useNavigate();
     const handlesignup = async(e)=>{
        e.preventDefault();
        console.log(sihnUpInfo);
        const {name,email,password} = sihnUpInfo;

        if (!name || !email || !password){
            return handleError("name ,email,pfassword are required");
        }

        try{
           const url = "https://authentication-mern-app-api-beta.vercel.app/auth/signup";
           const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sihnUpInfo),
        });
        const data = await response.json();
        console.log(data);

        const {success,message,error} = data;
        if(success){
            handleSucess(message);
            setTimeout(()=>{
                navigate('/login');
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
        <h1>Signup</h1>
        <form onSubmit={handlesignup}>
            <div>
                <label htmlFor="name"></label>
                <input 
                type="text" 
                name='name'
                autoFocus
                placeholder='Enter your name...'
                value = {sihnUpInfo.name}
                onChange={handlechange}
                />
            </div>

            <div>
                <label htmlFor="email"></label>
                <input 
                type="email" 
                name='email'
                autoFocus
                placeholder='Enter your email...'
                 value = {sihnUpInfo.email}
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
                 value = {sihnUpInfo.password}
                onChange={handlechange}
                />
            </div>
            <button type='submit'>Signup</button>
            <span>Already have an Account ? <Link to='/login'>Login</Link></span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Signup
