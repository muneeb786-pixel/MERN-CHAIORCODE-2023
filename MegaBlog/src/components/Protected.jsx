import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Protected({children, authenticated=true}) {
  
    const navigate= useNavigate()
    const [loader, setLoader]= useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        if(authenticated && authStatus !== authenticated){
            navigate('/login')
        }else if(!authenticated && authStatus !== authenticated){
            navigate('/')
        }
        setLoader(false)
    },[authenticated,navigate,authStatus])

    return loader ? <h1>...loading</h1> : <>{children}</>
}

export default Protected