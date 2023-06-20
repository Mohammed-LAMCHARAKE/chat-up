import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useUser from '../hooks/useUser'

function ProtectedRoutes(props) {
  return useUser().isAnonymous == false ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes
