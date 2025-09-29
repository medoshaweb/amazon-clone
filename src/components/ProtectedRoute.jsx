import React, {children, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StateContext } from './DataProvider/DataProvider'

const ProtectedRoute = ({ children, message, redirect }) => {
    const navigate = useNavigate()
      const { state } = useContext(StateContext);
      const { user, basket } = state;
      const location = useLocation();
      
      useEffect(()=>{
        
        if(!user){
          
            navigate("/auth", {state:{message, redirect}})
        }
      },[user, navigate, redirect, message])
  return children
}



export default ProtectedRoute