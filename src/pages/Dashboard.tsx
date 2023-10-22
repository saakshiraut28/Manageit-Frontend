import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { getUserData } from "../services/user"

import  Sidenav  from "../components/Sidenav";
import  taskCard  from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import ProjectModal from "../components/ProjectModal";

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
    <div className=''>
      <Sidenav />
    </div>
  )
}

export default Dashboard