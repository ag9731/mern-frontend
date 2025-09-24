import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    if(loading)
        return<div>loading</div>

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
     return <Outlet/>
  
}

export default RequireAuth