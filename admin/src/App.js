import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import Item from "./pages/item/Item"
import AddEditItem from "./pages/add-edit-item/AddEditItem"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} /> 
        <Route path="users">
          <Route index element={<List />} />
          <Route path=":uId" element={<Item />} />
          <Route path="new" element={<AddEditItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App