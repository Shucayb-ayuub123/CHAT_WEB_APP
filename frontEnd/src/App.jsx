import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthstore'

const App = () => {
  const {Login , isLoading} = useAuthStore()
 
  console.log(isLoading)
  return (
    <div className='min-h-screen  bg-slate-900 relatie flex items-center justify-center p-4 overflow-hidden'>
     <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
       <button onClick={Login} className='z-10'>mm</button>
   <Routes>
    <Route path='/' element={<ChatPage  />}></Route>
    <Route path='/Login' element={<LoginPage/>}></Route>
    <Route path='/signUp' element={<SignupPage />}></Route>
   </Routes>
    </div>
  )
}

export default App