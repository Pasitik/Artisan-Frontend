import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const PrivateRoutes = () => {
    const isAuthenticated = useSelector(state=> state.users.token != null)

  return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes;