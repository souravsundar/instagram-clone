import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({setUser,setProfile}) => {
  const navigate=useNavigate();
  const value=localStorage.getItem('Auth');
  // const [username,setUserName]=useState("")
  useEffect(()=>{
    getDetails();
  },[])
  const getDetails=async()=>{
    if(value!==null){
    try {
      const res=await axios.get("http://localhost:3000/api/home",{headers:{"Authorization":`Bearer ${value}`}})
    if (res.status==200) {
      // setUserName(res.data.username);
      
      console.log(res.data);
      setUser(res.data.username);
     
      if(res.data.profile)
        setProfile(res.data.profile.profile);
      
    }else if (res.status==403){
      alert(res.data.msg);
      navigate('/login')
    }
    else{
      navigate('/login')
    }
    } catch (error) {
      console.log("error");
      navigate('/login')
    }
    }else{
      navigate('/login')
    }
  }

  // console.log(username);
  
  return (
    <div className="nav">
        <h1>Home</h1>
    </div>
  )
}

export default Home
