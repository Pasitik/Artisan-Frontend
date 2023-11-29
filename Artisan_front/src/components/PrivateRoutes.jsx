import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const PrivateRoutes = () => {
    //const isAuthenticated = useSelector(state=> state.users.token != null)
    const isAuthenticated = localStorage.getItem('authToken') != null

    //console.log()

  return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes;