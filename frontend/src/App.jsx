import React from 'react'
import AppRoutes from './routes/AppRoutes'
import AuthProvider from './app/context/useAuthContext'

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  )
}

export default App