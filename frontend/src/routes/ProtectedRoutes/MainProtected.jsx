import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import AuthLoadingPage from '../../features/auth/ui/pages/AuthLoadingPage';


const MainProtected = () => {

  const {isAuthenticated, isLoading} = useSelector((state) => state.auth)


  // if(isLoading) return <AuthLoadingPage/>

  if(!isAuthenticated){
    return <Navigate to={"/"}/>
  }

  return <Outlet/>
}

export default MainProtected
