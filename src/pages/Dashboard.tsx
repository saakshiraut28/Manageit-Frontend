import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { getUserData } from "../services/user"

const Dashboard = () => {
  let token = localStorage.getItem('token') ;
  const navigate = useNavigate() ;

  useEffect(() => {
    // token = localStorage.getItem('token') ;
    // if (!token) navigate('/auth') ;
    // const resp = getUserData(token) ;
    // if (!resp.user){
    //   localStorage.removeItem('token') ;
    //   navigate("/auth") ;
    // }
  }, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard