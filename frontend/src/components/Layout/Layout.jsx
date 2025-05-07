import React from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { Routers } from '../../routes/Routers'
import { useLocation } from 'react-router-dom'

export const Layout = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Header />}  
      <Routers />
      {!isAuthPage && <Footer />}  
    </>
  )
}
