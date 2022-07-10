import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="login" element={<Login />} /> 
        <Route path="users">

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App