import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const RefreshHandlers = ({setIsAuthenticated}) => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setIsAuthenticated(true);
            if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'){
                navigate('/home');
            }
        }
    },[location,navigate,setIsAuthenticated])

  return (
    null
  )
}

export default RefreshHandlers