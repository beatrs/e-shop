import React, { useContext, useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import Item from "./pages/item/Item"
import Settings from "./pages/settings/Settings"
import AddEditItem from "./pages/add-edit-item/AddEditItem"
import './styles/darkMode.scss'

import { DarkModeContext } from "./context/darkMode"
import { useSelector } from "react-redux"
import AddEditUser from "./pages/add-edit-user/AddEditUser"
import User from "./pages/user/User"

function App() {
  
  const {darkMode} = useContext(DarkModeContext)
  
  const user = useSelector((state) => state.user.currentUser)
  const redirectTo = (link) => {
    return (
      <Navigate to={link} />
    )
  } 

  return(
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : redirectTo('/login')} />

          <Route path="login" element={!user ? <Login /> : redirectTo('/')} /> 

          <Route path="users">
            <Route index element={user? <List type="users"/> : redirectTo('/login')} />
            <Route path=":uId" element={user? <User /> : redirectTo('/login')} />
            <Route path="new" element={user? <AddEditUser type="add" /> : redirectTo('/login')} />
            <Route path="edit/:uId" element={user? <AddEditUser type="edit" /> : redirectTo('/login')} />
          </Route>

          <Route path="products">
            <Route index element={user? <List type="products" /> : redirectTo('/login')} />
            <Route path=":pId" element={user ? <Item /> : redirectTo('/login')} />
            <Route path="new" element={user ? <AddEditItem type="add" /> : redirectTo('/login')} />
            <Route path="edit/:pId" element={user ? <AddEditItem type="edit" /> : redirectTo('/login')} />
          </Route>

          <Route path="settings" element={user? <Settings /> : redirectTo('/login')} />

        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App