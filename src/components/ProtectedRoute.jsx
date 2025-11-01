import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StateContext } from './DataProvider/DataProvider'

const ProtectedRoute = ({ children, message, redirect }) => {
    const navigate = useNavigate()
      const { state } = useContext(StateContext);
      const { user } = state;
      
      useEffect(()=>{
        
        if(!user){
          
            navigate("/auth", {state:{message, redirect}})
        }
      },[user, navigate, redirect, message])
  return children
}



export default ProtectedRoute