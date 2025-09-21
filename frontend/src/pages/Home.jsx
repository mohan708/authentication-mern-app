import React, { use, useEffect, useState } from 'react'
import { handleError, handleSucess } from './utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Home = () => {
    const [loggedInUser,setLoggedinUser] = useState('');
    const [product,setDataProduct] = useState('')

    useEffect(()=>{
      const data =   localStorage.getItem("loggedInUser");
        setLoggedinUser(data);
    },[])
    const navigate = useNavigate();
    const handleLoggedOut = (e) =>{        
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");       
        handleSucess('Logged out successfully');
        setTimeout(()=>{
               navigate('/login')
        },1000)
}

const fetchProduct = async ()=>{
    try{
    const url = "https://authentication-mern-app-api-beta.vercel.app/products";
      const headers = {
        headers:{
        "Authorization": localStorage.getItem("token")}
      }
     const response = await fetch(url,headers);
        const data = await response.json();
        setDataProduct(data);
        console.log(data);
    }catch(err){
        handleError(err)
    }

}

useEffect(()=>{
     fetchProduct();
},[])


  return (
    <div >
        <h1>{loggedInUser}</h1>
        
  
        <button onClick={handleLoggedOut} >Logout</button>

        <div>
            {
                product && product?.map((item,index)=>
                    (
                        <div key={index}>
                            <span>{item.name} : {item.price}</span>
                        </div>
                    ))
                
            }
        </div>
       
< ToastContainer />
        </div>
  )
}

export default Home
