import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,useNavigate } from 'react-router-dom';

export default function ProtectedRoute({isAdmin,component:Component,...rest}) {
    const {loading,isAuthenticated,user} = useSelector(state=>state.user);
    const navigate = useNavigate();
  return (
    <>
    {
    !(loading===false) && (isAuthenticated===false)?navigate("/login"):
      (isAdmin===true && user.role !== 'admin')?<Component {...rest}/>:navigate("/product")  
    }
    </>
  )
}
