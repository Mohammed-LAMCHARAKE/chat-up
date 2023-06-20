import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './components/Chat'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import SignUp from './components/SignUp'
import ChatContextProvider from './contexts/ChatContext'
import { UserContextProvider } from './contexts/UserContext'

function App() {
  return (
    <UserContextProvider>
      <ChatContextProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}></Route>
          <Route path='/chat' element={<Chat />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </ChatContextProvider>
    </UserContextProvider>
  )
}

export default App
